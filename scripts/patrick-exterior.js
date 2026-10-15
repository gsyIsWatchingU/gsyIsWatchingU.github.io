import * as THREE from 'three';
import {rockTex,texMat,buildWeatherVane} from './patrick-build.js';

// 复用派大星正式页的闭合岩石曲面、纹理与风向标，保持街景与室内外观一致。
export function createPatrickExterior(){
  function displace(geo, seed) {
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    const a = seed * 12.9898;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const r = v.length();
      if (r < 0.001) continue;
      const nx = v.x / r, ny = v.y / r, nz = v.z / r;
      const n =
        Math.sin(a + nx * 6.2 + ny * 3.1) * Math.cos(a + nz * 5.1 - ny * 2.2) +
        0.5 * Math.sin(a + nx * 11.3 - nz * 7.7 + ny * 4.4) +
        0.25 * Math.cos(a + nx * 17.7 + nz * 13.1 + ny * 8.8);
      const f = ny < 0.12 ? Math.max(0, 1 - (0.12 - ny) * 4) : 1;
      // 温和低频起伏：保持圆润低矮岩石穹顶，不做尖山/破碎壳
      const grow = 1 + Math.max(-0.035, Math.min(0.035, n * 0.012)) * f;
      v.setLength(r * grow);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }

  const group=new THREE.Group();const geometry=new THREE.SphereGeometry(4.5,64,28,0,Math.PI*2,0,Math.PI/2);
  const rockMaterial=texMat(rockTex(512),.9);rockMaterial.side=THREE.DoubleSide;
  displace(geometry,1);group.add(new THREE.Mesh(geometry,rockMaterial));
  // 翻起时也能看到实体岩石底面，避免单面穹顶像薄壳一样消失。
  const underside=new THREE.Mesh(new THREE.CircleGeometry(4.5,64),rockMaterial);underside.name='rock_solid_underside';underside.rotation.x=Math.PI/2;group.add(underside);
  const vane=buildWeatherVane();vane.position.set(0,4.5,0);group.add(vane);return group;
}
