import * as THREE from "three";

const coatColor = `
  float paws = 1.0 - smoothstep(.10, .24, vFurRest.y);
  float facePoint = smoothstep(.38,.46,vFurRest.z) * (1.0-smoothstep(.57,.65,vFurRest.y)) * smoothstep(.46,.51,vFurRest.y);
  float earPoint = smoothstep(.075,.105,abs(vFurRest.x)) * smoothstep(.68,.72,vFurRest.y);
  float bright = smoothstep(.12,.38,dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)));
  float blueEye = step(diffuseColor.r*1.25,diffuseColor.b)*step(.08,diffuseColor.b);
  vec3 pointColor = vec3(.025,.011,.006);
  diffuseColor.rgb = mix(diffuseColor.rgb, pointColor, bright * max(max(paws,facePoint),earPoint) * (1.0-blueEye));
`;

// 短绒毛与原网格共用骨架、UV 和贴图；每层随蒙皮运动，脸部不覆盖眼鼻。
export function addSiameseFur(model, { layers = 5, length = .005 } = {}) {
  const meshes = [];
  model.traverse(node => { if (node.isSkinnedMesh) meshes.push(node); });
  const shells = [];
  let fibers=0;
  for (const mesh of meshes) {
    mesh.material.roughness=.95;mesh.material.metalness=0;
    mesh.material.roughnessMap=null;mesh.material.metalnessMap=null;
    if(mesh.material.isMeshPhysicalMaterial){mesh.material.sheen=.25;mesh.material.sheenColor.set('#9b8c77');mesh.material.sheenRoughness=1;}
    mesh.material.onBeforeCompile = shader => {
      shader.vertexShader = "varying vec3 vFurRest;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>\nvFurRest = position;");
      shader.fragmentShader = "varying vec3 vFurRest;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>","#include <map_fragment>\n"+coatColor);
    };
    mesh.material.customProgramCacheKey = () => "siamese-point-coat-v1";
    mesh.material.needsUpdate = true;
    const geometry = mesh.geometry.clone();
    const position = geometry.attributes.position;
    const lengths = new Float32Array(position.count);
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i), z = position.getZ(i);
      const face = y > .47 && z > .19;
      lengths[i] = y < .32 ? .38 : face ? .22 : 1;
    }
    geometry.setAttribute("furLength", new THREE.BufferAttribute(lengths, 1));
    for (let layer = 1; layer <= layers; layer++) {
      const depth = layer / layers;
      const material = mesh.material.clone();
      material.roughness = .97;
      material.metalness = 0;
      material.alphaTest = .01;
      material.alphaToCoverage = false;
      material.transparent = true;
      material.depthWrite = false;
      material.side = THREE.FrontSide;
      material.onBeforeCompile = shader => {
        shader.uniforms.furDepth = { value: depth };
        shader.uniforms.furLengthScale = { value: length };
        shader.vertexShader = "attribute float furLength; varying vec3 vFurRest; varying float vFurLength; uniform float furDepth; uniform float furLengthScale;\n" + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `
          #include <begin_vertex>
          vFurRest = position; vFurLength = furLength;
          transformed += normal * furLengthScale * furDepth * furLength;
        `);
        shader.fragmentShader = "varying vec3 vFurRest; varying float vFurLength; uniform float furDepth;\n" + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>","#include <map_fragment>\n"+coatColor);
        shader.fragmentShader = shader.fragmentShader.replace("#include <alphatest_fragment>", `
          vec3 furCell = floor(vFurRest * 390.0);
          float strand = fract(sin(dot(furCell, vec3(127.1,311.7,74.7))) * 43758.5453);
          float coverage = smoothstep(furDepth * .86, furDepth * .86 + .16, strand);
          // 蓝眼珠的高光和湿润鼻尖直接露出底层表面。
          float eye = step(diffuseColor.r * 1.25, diffuseColor.b) * step(.18, diffuseColor.b);
          diffuseColor.a *= coverage * (1.0 - eye) * .24;
          diffuseColor.rgb *= 1.0 + .045 * furDepth;
          #include <alphatest_fragment>
        `);
      };
      material.customProgramCacheKey = () => "siamese-short-fur-v2";
      const shell = new THREE.SkinnedMesh(geometry, material);
      shell.name = `siamese_short_fur_${layer}`;
      shell.position.copy(mesh.position); shell.quaternion.copy(mesh.quaternion); shell.scale.copy(mesh.scale);
      shell.bindMode = mesh.bindMode;
      shell.bind(mesh.skeleton, mesh.bindMatrix);
      shell.frustumCulled = false;
      shell.userData = { ...mesh.userData, petFur: true };
      // 点击仍由原始网格判定，毛层不增加命中次数。
      shell.raycast = () => {};
      mesh.parent.add(shell);
      shells.push(shell);
    }
    // 从 GPU 曲面采样细短毛丝。UV 与四骨权重来自原表面，轮廓能看见独立毛尖。
    const indices=geometry.index,uv=geometry.attributes.uv,normal=geometry.attributes.normal;
    const skinIndex=geometry.attributes.skinIndex,skinWeight=geometry.attributes.skinWeight;
    const cumulative=[];let area=0;
    const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),ab=new THREE.Vector3(),ac=new THREE.Vector3();
    for(let i=0;i<indices.count;i+=3){a.fromBufferAttribute(position,indices.getX(i));b.fromBufferAttribute(position,indices.getX(i+1));c.fromBufferAttribute(position,indices.getX(i+2));area+=ab.subVectors(b,a).cross(ac.subVectors(c,a)).length()*.5;cumulative.push(area);}
    let seed=1040;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    const coordinates=[],normals=[],texcoords=[],joints=[],weights=[],triangles=[];
    const point=new THREE.Vector3(),n=new THREE.Vector3(),side=new THREE.Vector3(),direction=new THREE.Vector3(),tangent=new THREE.Vector3();
    for(let strand=0;strand<14000;strand++){
      const sample=random()*area;let low=0,high=cumulative.length-1;
      while(low<high){const middle=(low+high)>>1;if(cumulative[middle]<sample)low=middle+1;else high=middle;}
      const ids=[0,1,2].map(k=>indices.getX(low*3+k));
      const r=Math.sqrt(random()),s=random(),factors=[1-r,r*(1-s),r*s];point.set(0,0,0);n.set(0,0,0);
      const texture=new THREE.Vector2();ids.forEach((id,k)=>{point.addScaledVector(a.fromBufferAttribute(position,id),factors[k]);n.addScaledVector(a.fromBufferAttribute(normal,id),factors[k]);texture.x+=uv.getX(id)*factors[k];texture.y+=uv.getY(id)*factors[k];});n.normalize();
      const face=point.y>.45&&point.z>.22&&point.y<.69;
      if(face&&Math.abs(point.x)<.11)continue;
      if(point.y<.30)continue;
      if(point.y<.025&&n.y<-.15)continue;
      const hairLength=(point.y<.14?.003:face||point.y>.69?.0028:length)*( .7+random()*.65);
      tangent.set(0,-1,0).addScaledVector(n,n.y).normalize();direction.copy(n).multiplyScalar(.86).addScaledVector(tangent,.35).normalize();
      side.crossVectors(n,new THREE.Vector3(random()-.5,random()-.5,random()-.5)).normalize();
      const sampleWeights=new Map();
      ids.forEach((id,index)=>{for(let k=0;k<4;k++){const joint=skinIndex.array[id*4+k];sampleWeights.set(joint,(sampleWeights.get(joint)??0)+skinWeight.array[id*4+k]*factors[index]);}});
      const binding=[...sampleWeights].sort((a,b)=>b[1]-a[1]).slice(0,4),total=binding.reduce((sum,p)=>sum+p[1],0);
      while(binding.length<4)binding.push([0,0]);
      const baseIndex=coordinates.length/3;
      for(let card=0;card<2;card++){
        if(card)side.crossVectors(direction,side).normalize();
        for(let corner=0;corner<4;corner++){
          const tip=corner>1,width=tip?.00004:.00032,sign=corner%2?1:-1;
          const p=point.clone().addScaledVector(n,.00035).addScaledVector(direction,tip?hairLength:0).addScaledVector(side,sign*width);
          coordinates.push(p.x,p.y,p.z);normals.push(n.x,n.y,n.z);texcoords.push(texture.x,texture.y);
          for(let k=0;k<4;k++){joints.push(binding[k][0]);weights.push(binding[k][1]/total);}
        }
        const start=baseIndex+card*4;triangles.push(start,start+1,start+2,start+2,start+1,start+3);
      }
    }
    const hairs=new THREE.BufferGeometry();hairs.setAttribute('position',new THREE.Float32BufferAttribute(coordinates,3));hairs.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));hairs.setAttribute('uv',new THREE.Float32BufferAttribute(texcoords,2));hairs.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(joints,4));hairs.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));hairs.setIndex(triangles);
    fibers+=coordinates.length/24;
    const hairMaterial=mesh.material.clone();hairMaterial.side=THREE.DoubleSide;hairMaterial.roughness=1;
    hairMaterial.onBeforeCompile=shader=>{mesh.material.onBeforeCompile(shader);shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_begin>',THREE.ShaderChunk.normal_fragment_begin.replace('normal *= faceDirection;',''));};hairMaterial.customProgramCacheKey=()=>"siamese-fiber-coat-v1";
    const hairMesh=new THREE.SkinnedMesh(hairs,hairMaterial);hairMesh.name='siamese_fine_fibers';hairMesh.position.copy(mesh.position);hairMesh.quaternion.copy(mesh.quaternion);hairMesh.scale.copy(mesh.scale);hairMesh.bindMode=mesh.bindMode;hairMesh.bind(mesh.skeleton,mesh.bindMatrix);hairMesh.frustumCulled=false;hairMesh.userData={...mesh.userData,petFur:true};hairMesh.raycast=()=>{};mesh.parent.add(hairMesh);shells.push(hairMesh);
  }
  return { layers, length, fibers, meshes: meshes.length, setVisible: value => shells.forEach(shell => shell.visible = value) };
}
