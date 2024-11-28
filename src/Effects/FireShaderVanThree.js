import * as THREE from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import glsl from "babel-plugin-glsl/macro";

const FireShaderVanThree = () => {
  class FireMaterial extends THREE.ShaderMaterial {
    constructor(texture) {
      super({
        defines: { ITERATIONS: "10", OCTAVES: "3" },
        uniforms: {
          fireTex: { value: texture },
          color: { value: new THREE.Color(0xffffff) },
          time: { value: 0.0 },
          seed: { value: Math.random() * 19.19 },
          invModelMatrix: { value: new THREE.Matrix4() },
          scale: { value: new THREE.Vector3(1, 1, 1) },
          noiseScale: { value: new THREE.Vector4(1, 2, 1, 0.3) },
          magnitude: { value: 2.5 },
          lacunarity: { value: 3.0 },
          gain: { value: 0.6 },
        },
        vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        }`,
        fragmentShader: glsl`
        #pragma glslify: snoise = require(glsl-noise/simplex/3d.glsl)

        uniform vec3 color;
        uniform float time;
        uniform float seed;
        uniform mat4 invModelMatrix;
        uniform vec3 scale;
        uniform vec4 noiseScale;
        uniform float magnitude;
        uniform float lacunarity;
        uniform float gain;
        uniform sampler2D fireTex;
        varying vec3 vWorldPos;

        float turbulence(vec3 p) {
          float sum = 0.0;
          float freq = 1.0;
          float amp = 1.0;
          for (int i = 0; i < OCTAVES; i++) {
            sum += abs(snoise(p * freq)) * amp;
            freq *= lacunarity;
            amp *= gain;
          }
          return sum;
        }

        vec4 sampleFire(vec3 p, vec4 scale) {
          vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);
          if (st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          p.y -= (seed + time) * scale.w;
          p *= scale.xyz;
          st.y += sqrt(st.y) * magnitude * turbulence(p);
          if (st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);
          return texture2D(fireTex, st);
        }

        vec3 localize(vec3 p) {
          return (invModelMatrix * vec4(p, 1.0)).xyz;
        }

        void main() {
          vec3 rayPos = vWorldPos;
          vec3 rayDir = normalize(rayPos - cameraPosition);
          float rayLen = 0.0288 * length(scale.xyz);
          vec4 col = vec4(0.0);
          for (int i = 0; i < ITERATIONS; i++) {
            rayPos += rayDir * rayLen;
            vec3 lp = localize(rayPos);
            lp.y += 0.5;
            lp.xz *= 2.0;
            col += sampleFire(lp, noiseScale);
          }
          col.a = col.r;
          gl_FragColor = col;
        }`,
      });
    }
  }

  async function init() {
    // Renderer setup
    const renderer = new THREE.WebGPURenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 4, 10);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load fire texture
    const textureLoader = new THREE.TextureLoader();
    const fireTexture = await textureLoader.loadAsync("/fire.png");
    fireTexture.magFilter = fireTexture.minFilter = THREE.LinearFilter;
    fireTexture.wrapS = fireTexture.wrapT = THREE.ClampToEdgeWrapping;

    // Fire material and mesh
    const fireMaterial = new FireMaterial(fireTexture);
    const fireMesh = new THREE.Mesh(new THREE.BoxGeometry(), fireMaterial);
    fireMesh.scale.set(2, 2, 2);
    fireMesh.position.set(-2, 0, 0); // Move fire box slightly left
    scene.add(fireMesh);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Add pink box
    const pinkBoxGeometry = new THREE.BoxGeometry();
    const pinkBoxMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
    const pinkBox = new THREE.Mesh(pinkBoxGeometry, pinkBoxMaterial);
    pinkBox.position.set(3, 0, 0); // Move pink box slightly right
    scene.add(pinkBox);

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      const elapsedTime = clock.getElapsedTime();
      fireMaterial.uniforms.time.value = elapsedTime;

      fireMesh.updateMatrixWorld();
      fireMaterial.uniforms.invModelMatrix.value
        .copy(fireMesh.matrixWorld)
        .invert();
      fireMaterial.uniforms.scale.value.copy(fireMesh.scale);

      controls.update(); // Update orbit controls
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  init();
};

export default FireShaderVanThree;
