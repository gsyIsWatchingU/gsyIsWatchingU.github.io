import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// 修复原阶梯：每阶踏面相接、侧梁连续，末阶落在客厅沙地。
export function createPatrickStairs(material) {
  const group = new THREE.Group(); group.name = 'connected-staircase';
  const count = 10, rise = 2.3 / count, run = .255, x = 3.2, start = -.65;
  const add = (geometry, position) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.fromArray(position);
    mesh.castShadow = mesh.receiveShadow = true; group.add(mesh); return mesh;
  };
  const beam = (a, b, width, depth) => {
    const from = new THREE.Vector3(...a), to = new THREE.Vector3(...b);
    const mesh = add(new RoundedBoxGeometry(width, from.distanceTo(to), depth, 3, .018), from.clone().add(to).multiplyScalar(.5).toArray());
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.sub(from).normalize()); return mesh;
  };
  for (let i = 0; i < count; i++) {
    const top = -(i + 1) * rise, z = start + i * run;
    const step = add(new RoundedBoxGeometry(.88, .065, run + .025, 3, .018), [x, top - .0325, z]);
    step.name = `tread-${i}`;
    add(new RoundedBoxGeometry(.84, rise, .035, 3, .008), [x, top + rise / 2, z - run / 2]);
    if ([0, 3, 6, 9].includes(i)) for (const side of [-1, 1]) {
      beam([x + side * .48, top, z], [x + side * .48, top + .66, z], .045, .045);
    }
  }
  for (const side of [-1, 1]) {
    const bx = x + side * .48;
    beam([bx, -.28, start - .1], [bx, -2.34, start + 9 * run + .1], .08, .13);
    beam([bx, .43, start], [bx, -1.64, start + 9 * run], .06, .06);
  }
  add(new RoundedBoxGeometry(.98, .075, .48, 3, .018), [x, -.0375, start - .32]);
  group.userData.dimensions = { count, rise, run, slopeDegrees: Math.atan(rise / run) * 180 / Math.PI, bottom: -2.3 };
  return group;
}
