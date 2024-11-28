import React, { useRef, useMemo } from "react";
import { extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three/webgpu";

import { Water } from "three/examples/jsm/objects/Water.js";
// import { Water } from "three/examples/jsm/objects/Water2.js";

extend({ Water });

function Water1({ rad = 10, active = 3 }) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.SphereGeometry(1, 30), []);
  const geom2 = useMemo(() => new THREE.PlaneGeometry(30, 30), []);
  const geom3 = useMemo(() => new THREE.CircleGeometry(rad, 100), []);
  //  color?: ColorRepresentation | undefined;
  //   textureWidth?: number | undefined;
  //   textureHeight?: number | undefined;
  //   clipBias?: number | undefined;
  //   flowDirection?: Vector2 | undefined;
  //   flowSpeed?: number | undefined;
  //   reflectivity?: number | undefined;
  //   scale?: number | undefined;
  //   shader?: object | undefined;
  //   flowMap?: Texture | undefined;
  //   normalMap0?: Texture | undefined;
  //   normalMap1?: Texture | undefined;
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xeb8934,
      waterColor: 0x0064b5,
      distortionScale: 4,
      fog: true,
      format: gl.encoding,
      transparent: true,
      opacity: 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals]
  );

  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta / 8)
  );

  return (
    <>
      {active == 1 && (
        <water
          ref={ref}
          args={[geom, config]}
          rotation-x={-Math.PI / 2}
          position={[0, 0.5, 0]}
        />
      )}
      {active == 2 && (
        <water
          ref={ref}
          args={[geom2, config]}
          rotation-x={-Math.PI / 2}
          position={[0, 0, 0]}
        />
      )}
      {active == 3 && (
        <water
          ref={ref}
          args={[geom3, config]}
          rotation-x={-Math.PI / 2}
          position={[0, 0, 0]}
        />
      )}
    </>
  );
}

export default Water1;
