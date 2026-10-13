"""保留 GPU 曲面与贴图，校准尺寸/坐标；派大星补语义骨架和真实蒙皮招手。"""
import bpy, bmesh, math, json, hashlib, sys
from pathlib import Path
from mathutils import Vector, Quaternion
from mathutils.kdtree import KDTree
source,target,name=map(str,sys.argv[sys.argv.index('--')+1:]);source=Path(source);target=Path(target);target.parent.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(source))
meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
for o in meshes:
    bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);o.select_set(False)
removed=0
for o in meshes:
    # 白底参考的接触阴影被 Shape 误生成成大底片。按低位、平面法线与中性灰纹理共同识别。
    from array import array
    bm=bmesh.new();bm.from_mesh(o.data);bm.normal_update();uv=bm.loops.layers.uv.active
    low=min(v.co.z for v in bm.verts);high=max(v.co.z for v in bm.verts)
    # PBR 导出的 UV 接缝会拆顶点。先识别两张完整背景板，再焊接曲面接缝；UV 仍留在 loops。
    pending=set(bm.verts);plates=[]
    while pending:
        first=pending.pop();stack=[first];part=[first]
        while stack:
            v=stack.pop()
            for e in v.link_edges:
                other=e.other_vert(v)
                if other in pending:pending.remove(other);stack.append(other);part.append(other)
        pmin=Vector([min(v.co[i] for v in part) for i in range(3)]);pmax=Vector([max(v.co[i] for v in part) for i in range(3)]);extent=pmax-pmin
        if extent.z<(high-low)*.12 and max(extent.x,extent.y)>(high-low)*.8 and pmax.z<low+(high-low)*.20:plates.extend(part)
    removed+=sum(len(v.link_faces) for v in plates)//3
    if plates:bmesh.ops.delete(bm,geom=plates,context='VERTS')
    bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00006)
    images={}
    for i,m in enumerate(o.data.materials):
        if m and m.use_nodes:
            shader=m.node_tree.nodes.get('Principled BSDF')
            if shader and shader.inputs['Base Color'].is_linked:
                node=shader.inputs['Base Color'].links[0].from_node
                if node.type=='TEX_IMAGE' and node.image:
                    im=node.image;pixels=array('f',[0])*(len(im.pixels));im.pixels.foreach_get(pixels);images[i]=(im,pixels)
    delete=[]
    for f in bm.faces:
        p=f.calc_center_median()
        if p.z>low+(high-low)*.095:continue
        gray=False
        if uv and f.material_index in images:
            im,pixels=images[f.material_index];v=sum((l[uv].uv for l in f.loops),Vector((0,0)))/len(f.loops)
            ix=max(0,min(im.size[0]-1,int(v.x*im.size[0])));iy=max(0,min(im.size[1]-1,int(v.y*im.size[1])));idx=(iy*im.size[0]+ix)*4
            rgb=pixels[idx:idx+3];gray=max(rgb)-min(rgb)<.12
        # 中性灰仅作检查记录；不能因此切掉正常家具脚部或打开角色脚底。
        if p.z<low+(high-low)*.035 or (abs(f.normal.z)>.995 and f.calc_area()>(high-low)**2*.12):delete.append(f)
    removed+=len(delete)
    if delete:bmesh.ops.delete(bm,geom=delete,context='FACES')
    loose=[v for v in bm.verts if not v.link_faces]
    if loose:bmesh.ops.delete(bm,geom=loose,context='VERTS')
    if bm.verts:
        base=min(v.co.z for v in bm.verts)
        bottomEdges=[e for e in bm.edges if e.is_boundary and max(v.co.z for v in e.verts)<base+(high-low)*.015]
        if bottomEdges:bmesh.ops.holes_fill(bm,edges=bottomEdges,sides=0)
    bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
points=[v.co for o in meshes for v in o.data.vertices]
lo=Vector([min(v[i] for v in points) for i in range(3)]);hi=Vector([max(v[i] for v in points) for i in range(3)])
original=hi-lo
# Blender 为 Z-up；GLB 导出一次 Y-up。底面中心为枢轴。
dimensions={'patrick':(None,None,1.7),'armchair':(1.38,1.1,1.45),'bed':(1.63,1.98,.88),'fridge':(.76,.68,1.68),'stove':(.81,.7,.94),'old-tv':(.72,.46,.88)}
dims=dimensions[name];uniform=(dims[2]/original.z)
scale=Vector([dims[i]/original[i] if dims[i] else uniform for i in range(3)])
center=Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
for o in meshes:
    for v in o.data.vertices:
        v.co=(v.co-center);v.co.x*=scale.x;v.co.y*=scale.y;v.co.z*=scale.z
    o.name=f'patrick-reference-{name}';o['sourceBackend']='Hunyuan3D-2.1 Shape + Paint; Blender normalization';o['humanReview']='pending'
    for p in o.data.polygons:p.use_smooth=True
    for material in o.data.materials:
        if not material or not material.use_nodes:continue
        shader=material.node_tree.nodes.get('Principled BSDF')
        if shader:
            # 画面采用手绘哑光材质，不让粗糙度压成高光塑料。
            for link in list(shader.inputs['Metallic'].links):material.node_tree.links.remove(link)
            shader.inputs['Metallic'].default_value=.03
            for link in list(shader.inputs['Roughness'].links):material.node_tree.links.remove(link)
            shader.inputs['Roughness'].default_value=.85
        for node in material.node_tree.nodes:
            if node.type=='TEX_IMAGE' and node.image:
                image=node.image
                if max(image.size)>1024:
                    r=1024/max(image.size);image.scale(max(1,int(image.size[0]*r)),max(1,int(image.size[1]*r)))
                if name=='patrick' and node.outputs['Color'].is_linked and any(link.to_socket.name=='Base Color' for link in node.outputs['Color'].links):
                    # Paint 的红橙肤色校准为参考图的暖粉色；保留眼白、眉眼和深色嘴部。
                    import numpy as np
                    a=np.empty(len(image.pixels),dtype=np.float32);image.pixels.foreach_get(a);a=a.reshape((-1,4))
                    mask=(a[:,0]>.4)&(a[:,0]>a[:,1]*1.25)&(a[:,0]>a[:,2]*1.15)
                    a[mask,1]=np.maximum(a[mask,1],a[mask,0]*.60);a[mask,2]=np.maximum(a[mask,2],a[mask,0]*.64)
                    image.pixels.foreach_set(a.reshape(-1));image.update()
                image.pack()
rig=None
def smooth(a,b,x):
    t=max(0,min(1,(x-a)/(b-a)));return t*t*(3-2*t)
if name=='patrick':
    # Shape 将下垂手臂与腹部融合；保留 GPU 身体/五官/贴图，重建肩侧独立连续曲面。
    # 采样原 GPU UV，避免用纯色管子替代角色皮肤。
    samples=[]
    for o in meshes:
        uv=o.data.uv_layers.active
        if uv:
            for loop in o.data.loops:samples.append((o.data.vertices[loop.vertex_index].co.copy(),uv.data[loop.index].uv.copy()))
    tree=KDTree(len(samples))
    for i,(p,uv)in enumerate(samples):tree.insert(p,i)
    tree.balance()
    def skinUV(point):return samples[tree.find(point)[1]][1]
    def bodyEdge(z):
        profile=[(.42,.30),(.6,.42),(.78,.45),(.92,.40),(1.04,.32),(1.13,.27)]
        for (z0,r0),(z1,r1)in zip(profile,profile[1:]):
            if z0<=z<=z1:return r0+(r1-r0)*(z-z0)/(z1-z0)
        return .3
    skinMaterial=meshes[0].data.materials[0]
    shader=skinMaterial.node_tree.nodes.get('Principled BSDF');skinImage=shader.inputs['Base Color'].links[0].from_node.image
    import numpy as np
    px=np.empty(len(skinImage.pixels),dtype=np.float32);skinImage.pixels.foreach_get(px);px=px.reshape((skinImage.size[1],skinImage.size[0],4))
    skinMask=(px[:,:,0]>.4)&(px[:,:,0]>px[:,:,1]*1.2)&(px[:,:,0]>px[:,:,2]*1.12)&(px[:,:,1]>.16)
    swatch=(.5,.5);best=-1;tile=24
    for yy in range(0,skinImage.size[1]-tile,16):
        for xx in range(0,skinImage.size[0]-tile,16):
            region=skinMask[yy:yy+tile,xx:xx+tile];ratio=float(region.mean())
            if ratio>.98:
                rgb=px[yy:yy+tile,xx:xx+tile,:3].mean(axis=(0,1));score=ratio-abs(float(rgb[0])-.70)*.5
                if score>best:best=score;swatch=((xx+tile/2)/skinImage.size[0],(yy+tile/2)/skinImage.size[1])
    def skinFace(f,uv):
        coord=sum((loop[uv].uv for loop in f.loops),Vector((0,0)))/len(f.loops)
        xx=max(0,min(skinImage.size[0]-1,int(coord.x*skinImage.size[0])));yy=max(0,min(skinImage.size[1]-1,int(coord.y*skinImage.size[1])))
        rgb=px[yy,xx,:3];return rgb[0]>rgb[1]*1.12 and rgb[0]>rgb[2]*1.05
    # 保留裁切前的 GPU 表面与逐三角形 UV，供完整身体曲面重投影。
    from mathutils.bvhtree import BVHTree
    from mathutils.geometry import barycentric_transform
    originalMesh=meshes[0].data;originalMesh.calc_loop_triangles()
    positions=[v.co.copy() for v in originalMesh.vertices]
    triIndices=[tuple(t.vertices) for t in originalMesh.loop_triangles]
    triUV=[tuple(originalMesh.uv_layers.active.data[li].uv.copy() for li in t.loops) for t in originalMesh.loop_triangles]
    surface=BVHTree.FromPolygons(positions,triIndices,all_triangles=True)
    for o in meshes:
        bm=bmesh.new();bm.from_mesh(o.data);uv=bm.loops.layers.uv.active
        cut=[]
        for f in bm.faces:
            p=f.calc_center_median()
            if p.z>.48 or p.z<.25 or skinFace(f,uv):cut.append(f)
        if cut:bmesh.ops.delete(bm,geom=cut,context='FACES')
        loose=[v for v in bm.verts if not v.link_faces]
        if loose:bmesh.ops.delete(bm,geom=loose,context='VERTS')
        bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
        for f in o.data.polygons:f.use_smooth=True
    def restoredMesh(label,vs,fs,uvs):
        data=bpy.data.meshes.new(label);data.from_pydata(vs,[],fs);data.update();o=bpy.data.objects.new(label,data);bpy.context.collection.objects.link(o);data.materials.append(skinMaterial)
        layer=data.uv_layers.new(name='GPU skin swatch transfer')
        for f in data.polygons:
            f.use_smooth=True
            for li in f.loop_indices:layer.data[li].uv=uvs[data.loops[li].vertex_index]
        meshes.append(o);return o
    # 身体从腰到头顶连续重拓扑，GPU 五官纹理逐像素投影，避免头/腹接缝和 UV 岛跨接。
    profile=[(.36,.34,.25),(.48,.395,.29),(.69,.43,.31),(.82,.415,.30),(1.0,.31,.245),(1.10,.265,.21),(1.28,.205,.175),(1.48,.14,.13),(1.63,.07,.068),(1.70,.001,.001)]
    def radiusAt(z):
        for q in range(len(profile)-1):
            z0,r0,d0=profile[q];z1,r1,d1=profile[q+1]
            if z0<=z<=z1:
                t=(z-z0)/(z1-z0);h=z1-z0
                prev=profile[max(0,q-1)];nxt=profile[min(len(profile)-1,q+2)]
                def interp(k):
                    v0=profile[q][k];v1=profile[q+1][k]
                    a=(v1-prev[k])/(z1-prev[0]);b=(nxt[k]-v0)/(nxt[0]-z0)
                    return max(.001,(2*t**3-3*t*t+1)*v0+(t**3-2*t*t+t)*h*a+(-2*t**3+3*t*t)*v1+(t**3-t*t)*h*b)
                return interp(1),interp(2)
        return profile[-1][1:]
    vs=[];fs=[];uvs=[];n=96;m=72
    for j in range(m+1):
        z=.36+1.34*j/m;r,d=radiusAt(z)
        for i in range(n+1):
            angle=i*math.tau/n;vs.append((r*math.cos(angle),d*math.sin(angle),z));uvs.append((i/n,j/m))
    for j in range(m):
        for i in range(n):fs.append((j*(n+1)+i,j*(n+1)+i+1,(j+1)*(n+1)+i+1,(j+1)*(n+1)+i))
    fs.extend([tuple(reversed(range(n))),tuple(m*(n+1)+i for i in range(n))]);body=restoredMesh('patrick continuous retopology',vs,fs,uvs)
    size=1024;texture=np.empty((size,size,4),dtype=np.float32)
    base=px[int(swatch[1]*px.shape[0]),int(swatch[0]*px.shape[1])].copy()
    for yy in range(size):
        z=.36+1.34*(yy+.5)/size;r,d=radiusAt(z)
        for xx in range(size):
            a=(xx+.5)/size*math.tau;p=Vector((r*math.cos(a),d*math.sin(a),z))
            color=base.copy()
            if z>.89 and math.sin(a)<-.40:
                closest,normal,index,distance=surface.ray_cast(Vector((p.x,-3,z)),Vector((0,1,0)))
                if index is not None:
                    ids=triIndices[index];uvs0=triUV[index]
                    uv=barycentric_transform(closest,*[positions[v] for v in ids],*[Vector((u.x,u.y,0)) for u in uvs0])
                    ix=max(0,min(px.shape[1]-1,int(uv.x*px.shape[1])));iy=max(0,min(px.shape[0]-1,int(uv.y*px.shape[0])))
                    color=px[iy,ix].copy()
                    if color[0]>.4 and color[0]>color[1]*1.12 and color[0]>color[2]*1.05:
                        color[:3]=base[:3]*.82+color[:3]*.18
                    if 1.08<z<1.315 and abs(p.x)<.22:color=base.copy()
            texture[yy,xx]=color
    baked=bpy.data.images.new('GPU face reprojected onto continuous retopology',width=size,height=size,alpha=True)
    baked.pixels.foreach_set(texture.reshape(-1));baked.pack()
    material=skinMaterial.copy();material.name='GPU face UV rebake';node=material.node_tree.nodes.get('Principled BSDF').inputs['Base Color'].links[0].from_node;node.image=baked
    body.data.materials[0]=material
    def atlasSwatch(predicate, fallback):
        mask=predicate(px[:,:,:3]);bestScore=-1;result=fallback
        for yy in range(0,px.shape[0]-8,8):
            for xx in range(0,px.shape[1]-8,8):
                score=float(mask[yy:yy+8,xx:xx+8].mean())
                if score>bestScore:bestScore=score;result=((xx+4)/px.shape[1],(yy+4)/px.shape[0])
        return result
    whiteUV=atlasSwatch(lambda rgb:(rgb.min(axis=2)>.78)&(rgb.max(axis=2)-rgb.min(axis=2)<.14),swatch)
    blackUV=atlasSwatch(lambda rgb:rgb.max(axis=2)<.10,swatch)
    def eyePatch(label,center,scale,uv):
        vs=[];fs=[];uvs=[];n=32;m=20
        for j in range(m+1):
            a=-math.pi/2+j*math.pi/m
            for i in range(n):
                b=i*math.tau/n;vs.append((center[0]+scale[0]*math.cos(a)*math.cos(b),center[1]+scale[1]*math.cos(a)*math.sin(b),center[2]+scale[2]*math.sin(a)));uvs.append(uv)
        for j in range(m):
            for i in range(n):fs.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
        patch=restoredMesh(label,vs,fs,uvs)
        if label.startswith('retopologized eye '):
            eyeMaterial=skinMaterial.copy();eyeShader=eyeMaterial.node_tree.nodes.get('Principled BSDF')
            for link in list(eyeShader.inputs['Normal'].links):eyeMaterial.node_tree.links.remove(link)
            eyeShader.inputs['Emission Color'].default_value=(.93,.92,.84,1);eyeShader.inputs['Emission Strength'].default_value=.16
            patch.data.materials[0]=eyeMaterial
    for sign in [-1,1]:
        eyePatch('retopologized eye '+str(sign),(sign*.085,-.197,1.205),(.093,.050,.124),whiteUV)
        eyePatch('retopologized pupil '+str(sign),(sign*.080,-.246,1.207),(.024,.012,.039),blackUV)
    greenMask=(px[:,:,1]>.45)&(px[:,:,1]>px[:,:,0]*1.04)&(px[:,:,1]>px[:,:,2]*1.6)
    greenUV=None
    for yy in range(0,skinImage.size[1]-24,16):
        for xx in range(0,skinImage.size[0]-24,16):
            if greenMask[yy:yy+24,xx:xx+24].mean()>.98:greenUV=((xx+12)/skinImage.size[0],(yy+12)/skinImage.size[1]);break
        if greenUV:break
    if greenUV:
        vs=[];fs=[];uvs=[];n=96
        for j in range(5):
            t=j/4;z=.32+t*.174;r=.428-t*.020;d=.321-t*.018
            for i in range(n+1):
                a=i*math.tau/n;vs.append((r*math.cos(a),d*math.sin(a),z));uvs.append(greenUV)
        for j in range(4):
            for i in range(n):fs.append((j*(n+1)+i,j*(n+1)+i+1,(j+1)*(n+1)+i+1,(j+1)*(n+1)+i))
        restoredMesh('continuous cloth waistband',vs,fs,uvs)
    for sign in [-1,1]:
        vs=[];fs=[];uvs=[];n=32;m=18
        for j in range(m+1):
            a=-math.pi/2+j*math.pi/m
            for i in range(n):
                b=i*math.tau/n;c=abs(math.cos(a))**.8
                vs.append((sign*.16+.11*c*math.cos(b),-.035+.135*c*math.sin(b),.135+.13*math.copysign(abs(math.sin(a))**.8,math.sin(a))))
                uvs.append((swatch[0]+math.cos(b)*.004,swatch[1]+(j/m-.5)*.014))
        for j in range(m):
            for i in range(n):fs.append((j*n+i,j*n+(i+1)%n,(j+1)*n+(i+1)%n,(j+1)*n+i))
        restoredMesh('patrick restored foot '+str(sign),vs,fs,uvs)
    for side,sign in [('L',-1),('R',1)]:
        vs=[];fs=[];uvs=[];rings=28;radial=24
        for j in range(rings+1):
            t=j/rings
            # 参考图的粗锥形腕端：肩到手尖是一段柔和曲面，没有球/圆柱接缝。
            center=Vector((sign*(.22+.53*t-.13*t*t),0,.88-.46*t))
            tangent=Vector((sign*(.53-.26*t),0,-.46)).normalized()
            n1=Vector((0,1,0));n2=tangent.cross(n1).normalized()
            radius=.145*(1-t)**.48+.004
            for k in range(radial):
                angle=k*math.tau/radial;p=center+radius*(math.cos(angle)*n1+math.sin(angle)*n2)
                vs.append(tuple(p));uvs.append((swatch[0]+math.cos(angle)*.004,swatch[1]+(t-.5)*.014))
        for j in range(rings):
            for k in range(radial):fs.append((j*radial+k,j*radial+(k+1)%radial,(j+1)*radial+(k+1)%radial,(j+1)*radial+k))
        fs.append(tuple(reversed(range(radial))));fs.append(tuple(rings*radial+k for k in range(radial)))
        data=bpy.data.meshes.new('reference curved arm '+side);data.from_pydata(vs,[],fs);data.update();o=bpy.data.objects.new('patrick-restored-arm-'+side,data);bpy.context.collection.objects.link(o);data.materials.append(skinMaterial)
        layer=data.uv_layers.new(name='GPU skin transfer')
        for f in data.polygons:
            f.use_smooth=True
            for li in f.loop_indices:layer.data[li].uv=uvs[data.loops[li].vertex_index]
        o['restoredArm']=side;meshes.append(o)
    # 骨架依据本次参考比例，Blender 修整的连续手臂曲面做肩/肘平滑分权。
    bpy.ops.object.armature_add();rig=bpy.context.object;rig.name='patrick-reference-rig'
    bpy.ops.object.mode_set(mode='EDIT');rig.data.edit_bones.remove(rig.data.edit_bones[0])
    segments={'patrick_root':((0,0,.42),(0,0,.72),None),'patrick_body':((0,0,.72),(0,0,1.05),'patrick_root'),'patrick_head':((0,0,1.05),(0,0,1.6),'patrick_body')}
    for side,sign in [('L',-1),('R',1)]:
        segments[f'patrick_arm_{side}']=((sign*.22,0,.88),(sign*.46,0,.65),'patrick_body')
        segments[f'patrick_forearm_{side}']=((sign*.49,0,.68),(sign*.62,0,.42),f'patrick_arm_{side}')
        segments[f'patrick_leg_{side}']=((sign*.15,0,.4),(sign*.15,0,.03),'patrick_root')
    for key,(head,tail,parent) in segments.items():
        b=rig.data.edit_bones.new(key);b.head=head;b.tail=tail
        if parent:b.parent=rig.data.edit_bones[parent]
    bpy.ops.object.mode_set(mode='OBJECT')
    counts={k:0 for k in segments}
    for o in meshes:
        groups={k:o.vertex_groups.new(name=k) for k in segments}
        for v in o.data.vertices:
            x,y,z=v.co;side='R' if x>=0 else 'L';ax=abs(x)
            head=smooth(.94,1.17,z);weights={'patrick_body':1-head,'patrick_head':head}
            if z<.48:weights={f'patrick_leg_{side}':1-smooth(.25,.48,z),'patrick_root':smooth(.25,.48,z)}
            if o.get('restoredArm'):
                side=o['restoredArm'];t=(v.index//24)/28;fore=smooth(.42,.78,t)
                weights={f'patrick_arm_{side}':1-fore,f'patrick_forearm_{side}':fore}
            total=sum(weights.values())
            for key,w in weights.items():
                if w>1e-6:groups[key].add([v.index],w/total,'REPLACE');counts[key]+=1
        o.parent=rig;mod=o.modifiers.new('GPU continuous surface skin','ARMATURE');mod.object=rig
    # 本候选的自动热权重会把头部混入右臂，已由浏览器逐帧拒绝。
    # 使用参考语义边界并隔离头/躯干，GPU 五官重投影到连续重拓扑身体。
    scene=bpy.context.scene;scene.render.fps=30;rig.animation_data_create()
    for clip in ['idle','wave']:
        action=bpy.data.actions.new(clip);rig.animation_data.action=action
        end=90 if clip=='idle' else 78
        for frame in range(0,end+1,3):
            t=frame/30
            for bone in rig.pose.bones:
                bone.rotation_mode='QUATERNION';bone.rotation_quaternion=Quaternion();bone.scale=(1,1,1)
            rig.pose.bones['patrick_body'].scale=(1+math.sin(t*math.tau/3)*.007,1,1+math.sin(t*math.tau/3)*.004)
            if clip=='wave':
                if t<.5:k=smooth(0,.5,t);angle=-1.65*k;elbow=-.18*k
                elif t<2:angle=-1.65+math.sin((t-.5)*math.tau*1.6)*.06;elbow=-.18+math.sin((t-.5)*math.tau*1.6+.8)*.12
                else:k=1-smooth(2,2.6,t);angle=-1.65*k;elbow=-.18*k
                for key,a in [('patrick_arm_R',angle),('patrick_forearm_R',elbow)]:
                    rest=rig.data.bones[key].matrix_local.to_quaternion()
                    rig.pose.bones[key].rotation_quaternion=rest.inverted()@Quaternion((0,1,0),a)@rest
            for bone in rig.pose.bones:
                bone.keyframe_insert(data_path='rotation_quaternion',frame=frame);bone.keyframe_insert(data_path='scale',frame=frame)
        action.use_fake_user=True
    rig.animation_data.action=None
    for bone in rig.pose.bones:bone.rotation_quaternion=Quaternion();bone.scale=(1,1,1)
    (target.parent/'patrick-weights.json').write_text(json.dumps(counts,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(target.with_suffix('.blend')))
bpy.ops.export_scene.gltf(filepath=str(target),export_format='GLB',export_yup=True,export_extras=True,export_animations=True,export_animation_mode='ACTIONS')
triangles=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes)
record=dict(id=name,rawSHA256=hashlib.sha256(source.read_bytes()).hexdigest(),runtimeSHA256=hashlib.sha256(target.read_bytes()).hexdigest(),originalZUp=list(original),scale=list(scale),removedBackdropFaces=removed,triangles=triangles,bones=len(rig.data.bones) if rig else 0,animations=['idle','wave'] if rig else [],status='review',humanReview='pending',repairs=['remove generated neutral backdrop','weld UV seam positions preserving loop UV','normalize bottom-center and scale','matte material','1024px embedded texture']+(['retain GPU textured shorts; Blender continuous body, shoulder-arm and feet retopology','ray-project GPU eyebrows and mouth; rebake skin; retopologize eyes and pupils; transfer GPU skin and cloth swatches','independent shoulder/elbow skin with rigid head and torso','warm pink skin correction','baked idle and wave'] if rig else []))
target.with_suffix('.json').write_text(json.dumps(record,indent=2)+'\n')
print('RUNTIME_READY',name,triangles,flush=True)
