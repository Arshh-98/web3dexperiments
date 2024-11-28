import React, { useEffect, useRef } from "react";
// import * as THREE from "three/webgpu";
import { extend, useFrame, Canvas } from "@react-three/fiber";

// Extend R3F with WebGPURenderer (optional if you want to enforce WebGPU usage)

function ExpParticle() {
  const pointsRef = useRef();

  // Number of particles
  const numParticles = 100000;

  // Generate random positions for the particles
  const positions = new Float32Array(numParticles * 3); // x, y, z for each particle
  const colors = new Float32Array(numParticles * 3); // r, g, b for each particle

  for (let i = 0; i < numParticles; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 50; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z

    colors[i * 3 + 0] = Math.random(); // r
    colors[i * 3 + 1] = Math.random(); // g
    colors[i * 3 + 2] = Math.random(); // b
  }

  // Animation loop to update particle positions on the GPU
  useFrame(() => {
    const points = pointsRef.current;
    if (points) {
      points.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* Set particle positions */}
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
        />
        {/* Set particle colors */}
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Use a PointsMaterial to render the particles */}
      <pointsMaterial
        vertexColors
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
}

export default ExpParticle;
