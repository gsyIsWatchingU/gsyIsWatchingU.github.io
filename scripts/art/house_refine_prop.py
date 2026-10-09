"""Blender 修整 Hunyuan 家具：浮屑清理、法线、尺度、枢轴和运行时导出。"""
import bpy
import bmesh
from mathutils import Vector
from pathlib import Path
import json
import hashlib
import sys
import math

args=sys.argv[sys.argv.index("--")+1:]
source=Path(args[0]);out=Path(args[1]);name=args[2];out.mkdir(parents=True,exist_ok=True)
DIMS={"chair":(.98,.88,1.6),"couch":(1.72,1.03,1.2),"table":(.72,.70,1.0),"bed":(1.55,1.75,1.80),"bathtub":(1.70,.92,.72),"sink":(.63,.43,.56),"toilet":(.66,.76,1.05),"barrel":(.56,.56,.70),"chest":(.84,.53,.52),"gary":(.86,.54,.79),"lounger":(.76,1.56,.95),"treasure":(1.40,1.25,1.48)}
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
objects=[o for o in bpy.context.scene.objects if o.type=="MESH"]
for o in objects:
    bpy.ops.object.select_all(action="DESELECT");o.select_set(True);bpy.context.view_layer.objects.active=o
    bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
    bm=bmesh.new();bm.from_mesh(o.data)
    if name=="chair":
        # 源图顶部的蓝墙被生成成实物薄片；按烘焙颜色及顶部位置清除该误生成部件。
        uv=bm.loops.layers.uv.active
        shader=o.data.materials[0].node_tree.nodes.get("Principled BSDF")
        images=[n.image for n in o.data.materials[0].node_tree.nodes if n.type=="TEX_IMAGE" and n.image and ("base" in n.name.lower() or "base" in n.image.name.lower())]
        if not images and shader and shader.inputs["Base Color"].is_linked:
            n=shader.inputs["Base Color"].links[0].from_node
            if n.type=="TEX_IMAGE":images=[n.image]
        if images and uv:
            image=images[0];pixels=list(image.pixels);w,h=image.size;zmax=max(v.co.z for v in bm.verts);zmin=min(v.co.z for v in bm.verts);remove=[]
            for face in bm.faces:
                if face.calc_center_median().z<zmin+(zmax-zmin)*.75:continue
                coords=sum((loop[uv].uv for loop in face.loops),Vector((0,0)))/len(face.loops)
                x=int(coords.x*w)%w;y=int(coords.y*h)%h;i=(y*w+x)*4;r,g,b=pixels[i:i+3]
                if g>r*1.10 and b>r*1.10:remove.append(face)
            if remove:bmesh.ops.delete(bm,geom=remove,context="FACES")
    bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.0002)
    # 只删除低面数、极小的孤立碎屑；保留椅腿、眼柄等标志部件。
    remaining=set(bm.verts);small=[]
    while remaining:
        first=remaining.pop();stack=[first];component=[first]
        while stack:
            v=stack.pop()
            for edge in v.link_edges:
                other=edge.other_vert(v)
                if other in remaining:remaining.remove(other);stack.append(other);component.append(other)
        if len(component)<12:small.extend(component)
    if small:bmesh.ops.delete(bm,geom=small,context="VERTS")
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
    if len(o.data.polygons)>18000:
        m=o.modifiers.new("curved silhouette LOD","DECIMATE");m.ratio=18000/len(o.data.polygons);bpy.ops.object.modifier_apply(modifier=m.name)
    for p in o.data.polygons:p.use_smooth=True
    for mat in o.data.materials:
        if mat and mat.use_nodes:
            shader=mat.node_tree.nodes.get("Principled BSDF")
            if shader:shader.inputs["Roughness"].default_value=.84;shader.inputs["Metallic"].default_value=0

points=[o.matrix_world@Vector(v) for o in objects for v in o.bound_box]
mins=Vector([min(v[i] for v in points) for i in range(3)]);maxs=Vector([max(v[i] for v in points) for i in range(3)])
original=(maxs-mins);dims=DIMS[name];center=Vector(((mins.x+maxs.x)/2,(mins.y+maxs.y)/2,mins.z))
for o in objects:
    for v in o.data.vertices:
        for i in range(3):v.co[i]=(v.co[i]-center[i])*dims[i]/max(original[i],.001)
    o.name=f"hunyuan_{name}";o["assetId"]=name;o["sourceBackend"]="Hunyuan3D-2.1";o["humanReview"]="pending"
path=out/f"{name}.glb"
bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(filepath=str(path),export_format="GLB",export_yup=True,export_extras=True)
tris=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in objects)
record={"asset":name,"rawSha256":hashlib.sha256(source.read_bytes()).hexdigest(),"runtimeSha256":hashlib.sha256(path.read_bytes()).hexdigest(),"triangles":tris,"dimensionsYUp":[dims[0],dims[2],dims[1]],"origin":"bottom-center","originalDimensionsZUp":list(original),"repairs":["remove tiny loose islands","merge close vertices","recalculate normals","decimate preserving UV","apply reference dimensions"],"status":"review","humanReview":"pending"}
(out/f"{name}-runtime.json").write_text(json.dumps(record,indent=2)+"\n")

# 独立材质预览与三分之四轮廓，作为资产审查证据。
scene=bpy.context.scene;scene.render.engine="CYCLES";scene.cycles.device="CPU";scene.cycles.samples=12
scene.render.resolution_x=400;scene.render.resolution_y=400;scene.render.resolution_percentage=100
scene.world=bpy.data.worlds.new("neutral review world");scene.world.color=(.55,.55,.55);scene.render.image_settings.file_format="PNG"
scene.view_settings.view_transform="Standard"
for loc,power,size in [((-3,-4,6),380,4),((3,-1,3),180,3)]:
    bpy.ops.object.light_add(type="AREA",location=loc);o=bpy.context.object;o.data.energy=power;o.data.shape="DISK";o.data.size=size
    o.rotation_euler=(Vector((0,0,dims[2]*.5))-o.location).to_track_quat("-Z","Y").to_euler()
bpy.ops.object.camera_add();camera=bpy.context.object;camera.data.type="ORTHO";camera.data.ortho_scale=max(dims)*1.55;scene.camera=camera
for view,loc in [("front",(0,-4,dims[2]*.85)),("quarter",(3,-4,dims[2]*1.2))]:
    camera.location=loc;camera.rotation_euler=(Vector((0,0,dims[2]*.5))-camera.location).to_track_quat("-Z","Y").to_euler()
    scene.render.filepath=str(out/f"{name}-{view}.png");bpy.ops.render.render(write_still=True)
print(f"PROP EXPORTED {name} {tris}")
