import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//const composer = new EffectComposer(renderer);
//const renderPass = new RenderPass(scene, camera);
//composer.addPass(renderPass);
//const glitchPass = new GlitchPass();
//composer.addPass(glitchPass);
//const outputPass = new OutputPass();
//composer.addPass(outputPass);

const geometry = new THREE.TorusKnotGeometry(10, 2, 100, 20, 5, 4);
const material = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color("red")
    },
    color2: {
      value: new THREE.Color("blue")
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  wireframe: true
});
const material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, material_line);

scene.add(cube);
//scene.add(line);

camera.position.z = 25;

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;

  renderer.render(scene, camera);

}
