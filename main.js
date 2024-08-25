import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 2, 100, 20, 5, 4);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, material_line);

scene.add(cube);
scene.add(line);

camera.position.z = 25;

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;

  renderer.render(scene, camera);

}
