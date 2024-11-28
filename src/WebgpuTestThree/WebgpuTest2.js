import React, { useEffect, useRef } from "react";
// import * as THREE from "three/webgpu";
import * as THREE from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import Water1 from "../Effects/Water1";

// Utility function to create instanced mesh
const createInstancedMesh = (geometry, material, count) => {
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  const matrix = new THREE.Matrix4();

  // Randomize positions for each instance
  for (let i = 0; i < count; i++) {
    matrix.setPosition(
      Math.random() * 50 - 25,
      Math.random() * 50 - 25,
      Math.random() * 50 - 25
    );
    mesh.setMatrixAt(i, matrix);
  }

  return mesh;
};
const stats = Stats();
document.body.appendChild(stats.dom);
// Utility function to create and configure the camera
const createCamera = (width, height) => {
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
  camera.position.set(0, 0, 5);
  return camera;
};

// Utility function to create WebGPU renderer
const createWebGPURenderer = (width, height) => {
  const renderer = new THREE.WebGPURenderer({ antialias: true });
  // const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  return renderer;
};

// Utility function to monitor FPS
const monitorFPS = (startTime) => {
  const endTime = performance.now();
  const fps = Math.round(1000 / (endTime - startTime));
  return fps;
};

const WebGPUTest2 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create camera, scene, and renderer
    const camera = createCamera(width, height);
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // Simple box geometry
    const material = new THREE.MeshNormalMaterial();

    // Add instanced mesh (10,000 instances)
    const instancedMesh = createInstancedMesh(geometry, material, 10000);
    scene.add(instancedMesh);

    // Create WebGPU renderer
    const renderer = createWebGPURenderer(width, height);

    // Append renderer to DOM
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.minDistance = 1;
    controls.maxDistance = 50;

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let lastTime = performance.now();
    const animate = () => {
      const time = performance.now();
      const fps = monitorFPS(lastTime);
      console.log(`FPS: ${fps}`);
      stats.update();

      // Rotate all instances
      instancedMesh.rotation.x += 0.01;
      instancedMesh.rotation.y += 0.01;

      renderer.render(scene, camera);
      controls.update(); // Update controls

      lastTime = time;
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={canvasRef}>
      <Water1 />
    </div>
  );
};

export default WebGPUTest2;
