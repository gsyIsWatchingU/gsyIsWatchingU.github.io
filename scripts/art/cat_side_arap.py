"""保留网格局部刚性，求侧卧肩髋的平滑变形；不以压短边长代替姿态修复。"""
import json, sys
from pathlib import Path
import numpy as np
from scipy import sparse
from scipy.sparse.linalg import factorized

data=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
p=np.array(data['positions'],dtype=np.float64).reshape(-1,3)
_,first,mapping=np.unique(np.round(p,5),axis=0,return_index=True,return_inverse=True)
rest=p[first]; n=len(rest)
faces=mapping[np.array(data['indices']).reshape(-1,3)]
edge_weights={}
for face in faces:
    for k in range(3):
        a,b,c=map(int,[face[k],face[(k+1)%3],face[(k+2)%3]])
        if a==b or a==c or b==c: continue
        u,v=rest[a]-rest[c],rest[b]-rest[c]
        cot=float(np.dot(u,v)/max(1e-12,np.linalg.norm(np.cross(u,v))))
        edge=tuple(sorted((a,b)))
        edge_weights[edge]=edge_weights.get(edge,0)+max(.02,min(20,cot))*.5
edges=np.array(list(edge_weights),dtype=int); a,b=edges[:,0],edges[:,1]
w=np.array(list(edge_weights.values())); delta=rest[a]-rest[b]
diagonal=np.bincount(np.r_[a,b],weights=np.r_[w,w],minlength=n)
L=sparse.diags(diagonal)-sparse.coo_matrix((np.r_[w,w],(np.r_[a,b],np.r_[b,a])),shape=(n,n)).tocsc()
fixed=np.zeros(n,dtype=bool)
np.logical_or.at(fixed,mapping,np.array(data['fixed'],dtype=bool))
free=np.flatnonzero(~fixed); fixed_ids=np.flatnonzero(fixed)
solve=factorized(L[free][:,free].tocsc()+sparse.eye(len(free),format='csc')*1e-9)
Lfc=L[free][:,fixed_ids]
rest_cross=np.cross(rest[faces[:,1]]-rest[faces[:,0]],rest[faces[:,2]]-rest[faces[:,0]])
rest_area=np.linalg.norm(rest_cross,axis=1)
eligible=(rest_area>2e-6)&np.any(~fixed[faces],axis=1)
active_faces=faces[eligible]; area_goal=rest_area[eligible]*.35
inverse_mass=(~fixed).astype(float)

def preserve_area(q,reference):
    pa,pb,pc=q[active_faces[:,0]],q[active_faces[:,1]],q[active_faces[:,2]]
    cross=np.cross(pb-pa,pc-pa); area=np.sum(cross*reference,axis=1)
    collapsed=area<area_goal
    if not np.any(collapsed): return q
    ids=active_faces[collapsed]; normal=reference[collapsed]
    a,b,c=pa[collapsed],pb[collapsed],pc[collapsed]
    gradients=np.stack([np.cross(b-c,normal),np.cross(c-a,normal),np.cross(a-b,normal)],axis=1)
    mass=inverse_mass[ids]
    denominator=np.sum(np.sum(gradients*gradients,axis=2)*mass,axis=1)
    multiplier=(area_goal[collapsed]-area[collapsed])/np.maximum(denominator,1e-12)
    movement=gradients*mass[:,:,None]*multiplier[:,None,None]
    correction=np.zeros_like(q); count=np.zeros(n)
    np.add.at(correction,ids.reshape(-1),movement.reshape(-1,3))
    np.add.at(count,ids.reshape(-1),mass.reshape(-1))
    q+=correction/np.maximum(count[:,None],1)*.8
    return q
edge_limit=np.linalg.norm(delta,axis=1)*2.32
edge_mass=inverse_mass[a]+inverse_mass[b]
def preserve_length(q):
    vector=q[b]-q[a]; length=np.linalg.norm(vector,axis=1)
    stretched=(length>edge_limit)&(edge_mass>0)
    if not np.any(stretched): return q
    ea,eb=a[stretched],b[stretched]
    change=vector[stretched]*(length[stretched]-edge_limit[stretched])[:,None]/np.maximum((length[stretched]*edge_mass[stretched])[:,None],1e-12)
    movement=np.zeros_like(q); count=np.zeros(n)
    np.add.at(movement,ea,change*inverse_mass[ea,None]);np.add.at(movement,eb,-change*inverse_mass[eb,None])
    np.add.at(count,ea,inverse_mass[ea]);np.add.at(count,eb,inverse_mass[eb])
    q+=movement/np.maximum(count[:,None],1)*.8
    return q

out=[]; stats=[]; previous_solution=np.zeros_like(rest)
np.add.at(previous_solution,mapping,np.array(data['baseline']).reshape(-1,3))
previous_solution/=np.bincount(mapping)[:,None]
for frame in data['frames']:
    raw=np.array(frame['posed']).reshape(-1,3)
    q=np.zeros_like(rest); np.add.at(q,mapping,raw)
    q/=np.bincount(mapping)[:,None]
    targets=q[fixed_ids].copy()
    q[free]=previous_solution[free]+solve(-Lfc@(targets-previous_solution[fixed_ids]))
    reference=np.cross(previous_solution[active_faces[:,1]]-previous_solution[active_faces[:,0]],previous_solution[active_faces[:,2]]-previous_solution[active_faces[:,0]])
    reference/=np.maximum(np.linalg.norm(reference,axis=1)[:,None],1e-12)
    matrix=np.array(frame['matrix']).reshape(4,4).T
    plane=matrix[1,:3]; intercept=matrix[1,3]
    for iteration in range(100):
        current=q[a]-q[b]
        covariance=np.zeros((n,3,3))
        term=w[:,None,None]*delta[:,:,None]*current[:,None,:]
        np.add.at(covariance,a,term); np.add.at(covariance,b,term)
        U,_,Vt=np.linalg.svd(covariance)
        rotation=Vt.transpose(0,2,1)@U.transpose(0,2,1)
        inverted=np.linalg.det(rotation)<0
        Vt[inverted,2,:]*=-1
        rotation=Vt.transpose(0,2,1)@U.transpose(0,2,1)
        rhs=np.zeros_like(rest)
        edge_rhs=w[:,None]*np.einsum('eij,ej->ei',(rotation[a]+rotation[b])*.5,delta)
        np.add.at(rhs,a,edge_rhs); np.add.at(rhs,b,-edge_rhs)
        previous=q.copy()
        q[free]=solve(rhs[free]-Lfc@targets); q[fixed_ids]=targets
        q=preserve_area(q,reference)
        height=q@plane+intercept
        contacts=(height<.001)&(~fixed)
        q[contacts]-=(height[contacts]-.001)[:,None]*plane[None,:]/np.dot(plane,plane)
        if np.max(np.linalg.norm(q-previous,axis=1))<1e-6: break
    for _ in range(180):
        q=preserve_area(q,reference)
        q=preserve_length(q)
        height=q@plane+intercept
        contacts=(height<.001)&(~fixed)
        q[contacts]-=(height[contacts]-.001)[:,None]*plane[None,:]/np.dot(plane,plane)
    lengths=np.linalg.norm(q[a]-q[b],axis=1)/np.maximum(1e-8,np.linalg.norm(delta,axis=1))
    stats.append({'level':frame['level'],'iterations':iteration+1,'minimumFloor':float(np.min(q@plane+intercept)),'maximumEdgeRatio':float(np.max(lengths)),'fixedVertices':len(fixed_ids),'freeVertices':len(free)})
    out.append(q[mapping].reshape(-1).tolist())
    previous_solution=q.copy()
    print(stats[-1],flush=True)
Path(sys.argv[2]).write_text(json.dumps({'frames':out,'stats':stats}),encoding='utf-8')
