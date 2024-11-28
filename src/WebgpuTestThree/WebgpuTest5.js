import React from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three/webgpu";
// import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

const WebgpuTest5 = () => {
  const renderer = new THREE.WebGPURenderer();
  //   const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const stats = Stats();
  document.body.appendChild(stats.dom);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  // Create 10,000 particles
  const geometry = new THREE.BufferGeometry();
  const particles = 1000000;
  const positions = new Float32Array(particles * 3);

  for (let i = 0; i < particles * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.minDistance = 1;
  controls.maxDistance = 50;
  const material = new THREE.PointsMaterial({ color: 0x888888 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate() {
    points.rotation.y += 0.002;
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
    stats.update();
  }

  animate();

  //   return <div></div>;
};

export default WebgpuTest5;
