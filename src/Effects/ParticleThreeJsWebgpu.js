import * as THREE from "three/webgpu";
// import * as THREE from "three/webgpu";

// import { WebGPURenderer } from "three/addons/renderers/webgpu/WebGPURenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer";

// Check WebGPU Support
if (!navigator.gpu) {
  document.body.innerHTML = "WebGPU is not supported on this browser.";
  throw new Error("WebGPU not supported");
}

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

// WebGPU Renderer
const renderer = new THREE.WebGPURenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry and Custom Shaders
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -0.5,
  -0.5,
  0.0, // Vertex 1
  0.5,
  -0.5,
  0.0, // Vertex 2
  0.0,
  0.5,
  0.0, // Vertex 3
]);
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// Vertex Shader
const vertexShader = `
  @stage(vertex)
  fn main(
    @location(0) position: vec3<f32>
  ) -> @builtin(position) vec4<f32> {
    return vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  @stage(fragment)
  fn main() -> @location(0) vec4<f32> {
    return vec4(0.0, 0.8, 1.0, 1.0); // Blue color
  }
`;

// Create Shader Material
console.log(THREE.ShaderMaterial);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  // const time = performance.now();
  // const fps = monitorFPS(lastTime);
  // console.log(`FPS: ${fps}`);
  // stats.update();

  // Rotate all instances
  // instancedMesh.rotation.x += 0.01;
  // instancedMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
  controls.update(); // Update controls

  // lastTime = time;
  requestAnimationFrame(animate);
};
// Animation Loop
export default function ParticleThreeJsWebgpu() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

ParticleThreeJsWebgpu();
