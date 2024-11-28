import React, { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
// import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Stats from "three/examples/jsm/libs/stats.module";

// Utility function to create a mesh
const createMesh = (geometry, material) => {
  return new THREE.Mesh(geometry, material);
};
const stats = Stats();
document.body.appendChild(stats.dom);
// Utility function to generate a scene with many geometries
const generateScene = (count) => {
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // Box geometry for simplicity
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    roughness: 0.5,
    metalness: 0.5,
  });

  for (let i = 0; i < count; i++) {
    const mesh = createMesh(geometry, material);
    mesh.position.set(
      Math.random() * 50 - 25,
      Math.random() * 50 - 25,
      Math.random() * 50 - 25
    ); // Random positions
    mesh.castShadow = true; // Enable shadow casting
    mesh.receiveShadow = true; // Enable receiving shadow
    scene.add(mesh);
  }

  return scene;
};

// Utility function to create and configure the camera
const createCamera = (width, height) => {
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
  camera.position.set(0, 0, 5); // Set initial position
  return camera;
};

// Utility function to initialize the WebGPU renderer
const createWebGPURenderer = (width, height) => {
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  // const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true; // Enable shadow maps
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
  return renderer;
};

// Animation loop for the scene
const animateScene = (time, scene, camera, renderer) => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x = time / 2000;
      child.rotation.y = time / 1000;
    }
  });
  stats.update();
  renderer.render(scene, camera);
};

const WebGPUTest1 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create the camera, scene, and renderer
    const camera = createCamera(width, height);
    const scene = generateScene(50000); // Generate 100,000 geometries
    const renderer = createWebGPURenderer(width, height);

    // Add a directional light with shadow casting enabled
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10); // Set light position
    light.castShadow = true; // Enable shadow casting from light
    scene.add(light);

    // Add an ambient light to softly illuminate the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Ambient light
    scene.add(ambientLight);

    // Append renderer to DOM
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Set animation loop
    renderer.setAnimationLoop((time) =>
      animateScene(time, scene, camera, renderer)
    );

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother camera movement
    controls.dampingFactor = 0.1;
    controls.enablePan = true; // Allow panning
    controls.enableZoom = true; // Allow zooming
    controls.minDistance = 1; // Set minimum zoom distance
    controls.maxDistance = 10; // Set maximum zoom distance

    // Handle resize

    //stats

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

export default WebGPUTest1;
