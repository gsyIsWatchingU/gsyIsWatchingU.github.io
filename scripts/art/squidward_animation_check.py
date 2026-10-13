"""按原网格边长检查各动作拉伸与脚底接触；不把数字等同审美批准。"""
from pathlib import Path
import bpy, sys, json
import numpy as np
blend,target=map(Path,sys.argv[sys.argv.index('--')+1:])
bpy.ops.wm.open_mainfile(filepath=str(blend))
rig=bpy.data.objects['squidward_rig'];objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
baselines={}
for obj in objects:
    pos=np.array([tuple(v.co) for v in obj.data.vertices]);edges=np.array([tuple(e.vertices) for e in obj.data.edges])
    length=np.linalg.norm(pos[edges[:,0]]-pos[edges[:,1]],axis=1);keep=length>1e-5
    baselines[obj.name]=(pos,edges[keep],length[keep])
result=[]
for name in ['idle','walk','wave','read','annoyed','happy','surprised','sad']:
    action=bpy.data.actions.get(name);rig.animation_data.action=action
    end=int(action.frame_range[1]);frames=sorted(set([0,end]+list(range(0,end+1,3))))
    ratios=[];ground=[];worst={"ratio":0}
    for frame in frames:
        bpy.context.scene.frame_set(frame);bpy.context.view_layer.update();dg=bpy.context.evaluated_depsgraph_get()
        pose=[]
        for obj in objects:
            ev=obj.evaluated_get(dg);mesh=ev.to_mesh();p=np.array([tuple(v.co) for v in mesh.vertices]);ev.to_mesh_clear()
            base,edges,length=baselines[obj.name];stretch=np.linalg.norm(p[edges[:,0]]-p[edges[:,1]],axis=1)/length
            ratios.extend(stretch.tolist())
            index=int(stretch.argmax())
            if float(stretch[index])>worst['ratio']:
                pair=edges[index]
                worst={'ratio':float(stretch[index]),'object':obj.name,'frame':frame,'edge':pair.tolist(),'length':float(length[index]),'base':base[pair].tolist(),'posed':p[pair].tolist(),'groups':[[[obj.vertex_groups[g.group].name,float(g.weight)] for g in obj.data.vertices[int(vertex)].groups] for vertex in pair]}
            if obj.name.startswith('squidward_leg.'):
                for sign in [-1,1]:
                    foot=(base[:,2]<.16)&(base[:,0]*sign>0)
                    if foot.any():pose.append(float(p[foot,2].min()))
        ground.append({'frame':frame,'feetMinZ':pose})
    arr=np.array(ratios)
    result.append({'clip':name,'samples':len(frames),'p99Stretch':float(np.quantile(arr,.99)),'maxStretch':float(arr.max()),'over23Ratio':float((arr>2.3).mean()),'minFootZ':min(min(p['feetMinZ']) for p in ground),'contact':ground,'worst':worst})
record={'status':'technical_review','sourceBlend':str(blend),'clips':result,'thresholds':{'p99':2.3,'max':20,'over23Ratio':.015,'penetration':-.006},'passed':all(x['p99Stretch']<2.3 and x['maxStretch']<20 and x['over23Ratio']<.015 and x['minFootZ']>-.006 for x in result)}
target.write_text(json.dumps(record,indent=2)+'\n');print(json.dumps({x['clip']:{k:v for k,v in x.items() if k!='contact'} for x in result},indent=2));print('PASSED',record['passed'])
if not record['passed']:raise RuntimeError('动作变形或接触门禁失败')
