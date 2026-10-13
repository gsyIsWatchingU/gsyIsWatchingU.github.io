import asyncio, json, os, unittest
from unittest.mock import patch
os.environ['TTS_ENABLED']='0'
from fastapi.testclient import TestClient
from backend.companion import server

class ServiceTests(unittest.TestCase):
    def setUp(self):
        server.sessions.clear();server.limits.clear();server.daily.clear();server.speech_cache.clear();server.redis_store=None
        self.previous=os.environ.pop('DEEPSEEK_API_KEY',None)
        self.client=TestClient(server.app)
    def tearDown(self):
        if self.previous:os.environ['DEEPSEEK_API_KEY']=self.previous
    def session(self):return self.client.post('/session').json()['session']
    def test_unconfigured_honest(self):
        token=self.session();r=self.client.post('/chat',json={'session':token,'message':'你好','room':'living','activity':'listen'})
        self.assertEqual(r.status_code,503);self.assertIn('尚未配置',r.json()['detail'])
    def test_session_isolation_and_no_free_tts(self):
        a,b=self.session(),self.session();server.sessions[a].turns['approved-turn-id']='你好'
        self.assertEqual(self.client.post('/speech',json={'session':b,'turnId':'approved-turn-id'}).status_code,404)
        self.assertEqual(self.client.post('/speech',json={'session':a,'turnId':'approved-turn-id','text':'任意文本'}).status_code,503)
    def test_invalid_model_outputs(self):
        from fastapi import HTTPException
        for raw in ['','[]','{}','{"reply":"","action":null}','{"reply":"好","action":"exec"}']:
            with self.assertRaises(HTTPException):server.validate_reply(raw)
        self.assertEqual(server.validate_reply('{"reply":"晚安","action":"sleep"}'),('晚安','sleep'))
    def test_rate_limit(self):
        for _ in range(10):self.assertEqual(self.client.post('/session').status_code,200)
        self.assertEqual(self.client.post('/session').status_code,429)
    def test_expiry(self):
        token=self.session();server.sessions[token].expires=0
        self.assertEqual(self.client.post('/speech',json={'session':token,'turnId':'approved-turn-id'}).status_code,401)
    def test_daily_budget(self):
        os.environ['DAILY_TURN_LIMIT']='1'
        asyncio.run(server.claim_daily())
        with self.assertRaises(server.HTTPException):asyncio.run(server.claim_daily())
        os.environ.pop('DAILY_TURN_LIMIT')
    def test_chat_action_and_authorized_speech(self):
        import httpx
        os.environ['DEEPSEEK_API_KEY']='test-only-not-a-real-key'
        token=self.session()
        class ModelClient:
            async def __aenter__(self):return self
            async def __aexit__(self,*args):return None
            async def post(self,*args,**kwargs):return httpx.Response(200,json={'choices':[{'message':{'content':'{"reply":"我这就去睡觉，晚安！","action":"sleep"}'}}]})
        with patch.object(server.httpx,'AsyncClient',return_value=ModelClient()):
            result=self.client.post('/chat',json={'session':token,'message':'去睡觉吧','room':'living','activity':'listen'})
        self.assertEqual(result.status_code,200);self.assertEqual(result.json()['action'],'sleep')
        old_tts=server.tts;server.tts=object()
        try:
            with patch.object(server,'synthesize',return_value=b'RIFF-test-audio') as synth:
                request={'session':token,'turnId':result.json()['turnId']}
                speech=self.client.post('/speech',json=request)
                self.assertEqual(speech.status_code,200);self.assertEqual(speech.headers['content-type'],'audio/wav')
                self.assertEqual(self.client.post('/speech',json=request).content,speech.content)
                synth.assert_called_once_with('我这就去睡觉，晚安！')
        finally:server.tts=old_tts;os.environ.pop('DEEPSEEK_API_KEY',None)
    def test_queue_full_and_generation_failure(self):
        token=self.session();server.sessions[token].turns['approved-turn-id']='你好'
        old=server.tts;server.tts=object();server.tts_slots=5
        request={'session':token,'turnId':'approved-turn-id'}
        try:
            self.assertEqual(self.client.post('/speech',json=request).status_code,429)
            server.tts_slots=0
            with patch.object(server,'synthesize',side_effect=RuntimeError('test-only TTS failure')):
                with self.assertRaises(RuntimeError):self.client.post('/speech',json=request)
            self.assertEqual(server.tts_slots,0);self.assertFalse(server.speech_jobs)
        finally:server.tts_slots=0;server.tts=old

if __name__=='__main__':unittest.main()
