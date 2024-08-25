import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const edges = new THREE.EdgesGeometry(geometry);
const material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });

const line = new THREE.LineSegments(edges, material_line);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(line);

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  line.rotation.x += 0.02;

  renderer.render(scene, camera);
}
