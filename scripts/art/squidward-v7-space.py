"""同步本轮实际装配锚点与预览镜头，避免沿用旧灰模尺寸。"""
import json,pathlib
root=pathlib.Path(__file__).resolve().parents[2];folder=root/'docs/neighborhood-review/config'
house=json.loads((folder/'house-config.json').read_text(encoding='utf-8-sig'))
refs=json.loads((root/'scripts/art/squidward-v7-references.json').read_text(encoding='utf-8-sig'))
asset_index=json.loads((root/'docs/neighborhood-review/asset-index.json').read_text(encoding='utf-8'))
floors=[.15,1.2,2.4,3.6]
anchors={room:{} for room in ['kitchen','living','bedroom','bathroom','art']}
for item in refs['items']:
 if item.get('kind')=='texture':continue
 room='bathroom' if item['room']=='bath' else item['room']
 anchors[room][item['id']]={'anchor':item['position'],'footprint':item['size'][:2],'height':item['size'][2],'rotationZDegrees':item.get('rotation',0),'source':'Forge3D + Blender 精修'}
fixed={'kitchen':{'cabinets':([-.5,.85,.15],[1.2,.42,.66]),'stove':([-.67,.67,.15],[.42,.44,.7]),'sink':([-.13,.72,.15],[.42,.44,.7]),'fridge':([.55,.75,.15],[.4,.45,.9]),'dining-table':([-.2,-.3,.15],[.75,.65,.57]),'stools-group':([-.2,-.3,.15],[.96,.3,.4])},'bedroom':{'nightstand-L':([-.93,.28,2.4],[.27,.27,.69]),'nightstand-R':([.18,.65,2.4],[.27,.27,.69]),'dresser':([.45,.6,2.4],[.38,.3,.6]),'bed-rug':([-.33,-.55,2.405],[.65,.4,.015])},'bathroom':{'shower-curtain':([.34,.65,3.6],[.7,.06,.7]),'washbasin':([.65,-.6,3.6],[.37,.3,.58])},'art':{'plinth-1':([.76,-.62,1.2],[.27,.27,.3]),'plinth-2':([.76,-.62,2.4],[.27,.27,.3]),'sculpture-1':([.76,-.62,1.5],[.23,.23,.37]),'sculpture-2':([.76,-.62,2.7],[.23,.23,.37])}}
for room,items in fixed.items():
 for item,(pos,size) in items.items():anchors[room][item]={'anchor':pos,'footprint':size[:2],'height':size[2],'source':'Blender 精修'}
space={'schema_version':'2.0','name':'squidward-reference-v7-space','updated':'2026-10-13','status':'review','coordinate_system':{'source':'Blender Z-up，+X 右，+Y 后，+Z 上；前方 -Y','glb_export':'glTF Y-up，前方 +Z','rule':'Blender (X,Y,Z) -> glTF (X,Z,-Y)，仅导出器转换一次','units':'米'},'overall':{'bbox_glTF':{'min':[-1.61,0,-1.55],'max':[1.61,4.62,1.625]},'shell':{'base_outer_radius':1.55,'inner_radius_base':1.35,'body_top_z':3.9,'apex_z':4.62},'default_view':'完整外观；查看剖面后按模型包围盒、FOV32、当前宽高比适配，朝向向量 (-0.5,0.55,0.8)，目标 glTF (0,2.3,0)'},'cutaway':{'removed_plan_angle_deg':[-193,-27],'angle_convention':'Blender +X 起，逆时针；-90 是正前','kept_walls':'wall_shell_main，封闭切口；完整壳体仅外观显示'},'floors':[{'level':i+1,'id':r['id'],'name':r['name'],'walk_height':floors[i],'floor_prefix':'floor_'+str(i+1),'camera_glTF':r['camera'],'target_glTF':r['target'],'closeup_hidden_floors':r.get('hideFloors',[])} for i,r in enumerate(house['houses']['squidward']['rooms'])],'slabs':{'front_clip_y_blender':-.88,'stairwell_center_blender':[.68,.03],'stairwell_radius':.47},'staircase':{'style':'三段相连的右侧弧形木梯','center_blender':[.68,.03],'inner_radius':.14,'outer_radius':.43,'steps':39,'steps_per_flight':13,'flight_angle_degrees':240,'directions':'每段交替反向，末端平台与下一段起点重合','walk_heights':floors,'handrail_height':.48},'furniture_anchors_blender':anchors,'preview_room_fit':'近景按 room camera/target 的方向重新算距离，宽2.3、高1.05、padding1.25；不沿用固定手机近景距离','assembly_script':'scripts/art/squidward-v7-assemble.py'}
space['overall']['bbox_glTF']={'min':asset_index['assets'][0]['bboxMin'],'max':asset_index['assets'][0]['bboxMax']}
space['overall']['shell']['cap']='圆角平顶，内墙自3.9至4.62保持近竖直，顶缘圆角；v7 取代旧椭圆穹顶'
(folder/'space-config.json').write_text(json.dumps(space,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
