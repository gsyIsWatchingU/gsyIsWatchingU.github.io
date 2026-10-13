"""不输出密钥的环境检查与独立音色试听生成。"""
import importlib.util, json, sys
from pathlib import Path

if len(sys.argv)==1:
    print(json.dumps({name:importlib.util.find_spec(name) is not None for name in ['fastapi','uvicorn','httpx','redis','qwen_tts','torch','soundfile']}))
else:
    import os,hashlib,time
    model=next(Path('/workspace/models/game-audio/huggingface/hub/models--Qwen--Qwen3-TTS-12Hz-1.7B-CustomVoice/snapshots').iterdir())
    os.environ['TTS_MODEL_PATH']=str(model)
    from backend.companion import server
    start=time.time();server.load_tts()
    if server.tts is None:raise RuntimeError(server.tts_error)
    text='嗨！我是海绵宝宝，我准备好啦！一起逛逛菠萝屋，看看今天有什么好玩的吧！'
    data=server.synthesize(text);out=Path(sys.argv[1]);out.mkdir(parents=True,exist_ok=True)
    (out/'welcome.wav').write_bytes(data)
    (out/'voice.json').write_text(json.dumps({'model':'Qwen3-TTS-12Hz-1.7B-CustomVoice','speaker':'Dylan','text':text,'host':'mygpu','cudaDevice':0,'secondsIncludingLoad':round(time.time()-start,2),'sha256':hashlib.sha256(data).hexdigest(),'status':'review','humanListening':'pending'},ensure_ascii=False,indent=2)+'\n')
    print('VOICE_REVIEW_READY')
