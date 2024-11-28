import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import * as THREE from "three";
import { WebgpuTestR3f1 } from "./WebgpuTestR3f1";

import { WebGPURenderer } from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js";

const Something = () => {
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   // Check for WebGPU support
  //   console.log(navigator.gpu);
  //   console.log(THREE.WebGPURenderer);
  //   if (!navigator.gpu) {
  //     console.error("WebGPU is not supported on this browser.");
  //     return;
  //   }

  //   // Canvas Element
  //   const canvas = canvasRef.current;

  //   // Scene, Camera, and WebGPU Renderer
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   camera.position.z = 5;

  //   // const renderer = new THREE.WebGPURenderer({ canvas });
  //   // renderer.setSize(window.innerWidth, window.innerHeight);

  //   // // Geometry and Material
  //   // const geometry = new THREE.BoxGeometry();
  //   // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   // const cube = new THREE.Mesh(geometry, material);
  //   // scene.add(cube);

  //   // // Animation Loop
  //   // const animate = () => {
  //   //   cube.rotation.x += 0.01;
  //   //   cube.rotation.y += 0.01;

  //   //   renderer.render(scene, camera);
  //   //   requestAnimationFrame(animate);
  //   // };

  //   // animate();

  //   // // Handle Resize
  //   // const onResize = () => {
  //   //   camera.aspect = window.innerWidth / window.innerHeight;
  //   //   camera.updateProjectionMatrix();
  //   //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   // };

  //   // window.addEventListener("resize", onResize);

  //   return () => {
  //     // Cleanup on unmount
  //     //   window.removeEventListener("resize", onResize);
  //     //   renderer.dispose();
  //   };
  // }, []);

  return (
    <>
      <div style={{ height: "50vh", width: "50vw", background: "pink" }}></div>
      {/* <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      /> */}
      {/* <WebgpuTestR3f1 /> */}
    </>
  );
};

export default Something;
