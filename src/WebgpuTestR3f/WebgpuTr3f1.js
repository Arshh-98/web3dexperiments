import * as React from "react";
import * as THREE from "three/webgpu";
// import * as THREE from "three";
// @ts-ignore
import WebGPUCapabilities from "three/examples/jsm/capabilities/WebGPU";
// @ts-ignore
// import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import Water1 from "../Effects/Water1";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraControls } from "@react-three/drei";
// import Water1 from "../Effects/Water1";
// import ExpParticle from "../Effects/ExpParticle";

export function WebgpuTr3f1(props) {
  //   if (!WebGPUCapabilities.isAvailable()) {
  //     return <h1 className={"no-support"}>WebGPU not supported</h1>;
  //   }

  return (
    <div style={{ height: "100vh", width: "100vw", background: "red" }}>
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        gl={(canvas) => {
          const r = new THREE.WebGPURenderer({ canvas });
          //   const r = new THREE.WebGLRenderer({ canvas });
          // r.setClearColor(0x000000, 0);
          return r;
        }}
        {...props}>
        <ambientLight intensity={5} />
        <CameraControls />
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color={"green"} />
        </mesh>
        <mesh position={[-4, 0, 0]}>
          <boxGeometry />
          <meshPhysicalMaterial color={"white"} />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry />
          <meshPhongMaterial color={"pink"} />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial color={"green"} />
        </mesh>
        <CheckGpu />
        {/* <ExpParticle /> */}
        {/* <Water1 /> */}
      </Canvas>
    </div>
  );
}

const CheckGpu = () => {
  const { gl } = useThree(); // Access the renderer (gl)

  useFrame(() => {
    // console.log("Renderer being used:", gl.constructor.name);
  });
  return <></>;
};
