import logo from "./logo.svg";
import "./App.css";
import { WebgpuTr3f1 } from "./WebgpuTestR3f/WebgpuTr3f1";
import WebgpuTest1 from "./WebgpuTestThree/WebgpuTest1";
// import WebGPUTest2 from "./WebgpuTestThree/WebgpuTest2";
import { Canvas } from "@react-three/fiber";
import FireShader from "./Effects/FireShader";
import FireShaderVanThree from "./Effects/FireShaderVanThree";
import WebgpuTest5 from "./WebgpuTestThree/WebgpuTest5";
import ParticleThreeJsWebgpu from "./Effects/ParticleThreeJsWebgpu";
// import WebgpuTest3 from "./WebgpuTestThree/WebgpuTest3";
import WebgpuTest4 from "./WebgpuTestThree/WebgpuTest4";
// import WebgpuTest4 from "./WebgpuTestThree/WebgpuTest4";

// import Something from "./Something";
// import { WebgpuTestR3f1 } from "./WebgpuTestR3f1";
// import VanillaThreeCode from "./VanillaThreeCode";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* <Something /> */}
        {/* <VanillaThreeCode /> */}
        {/* <WebgpuTestR3f1 /> */}
        {/* render green boxes with shadows , both gpu and gl used , performs better on webgl */}
        {/* <WebgpuTest1 /> */}
        {/* tried to test water , three js r3f mismatch */}
        {/* <Canvas>
          <WebGPUTest2 />
        </Canvas> */}
        {/* tried to use some shader , doesn't look expensive */}
        {/* <ParticleThreeJsWebgpu /> */}
        {/* expensive shader , throws gpubufferusage not defined*/}

        {/* <WebgpuTest3 /> */}
        {/* expensive shader , water mouse hover effect*/}

        <WebgpuTest4 />
        {/* error , buffer error , because water code is not compatilbe with webgpu , also material colors not visible in gpu*/}

        {/* <WebgpuTr3f1 /> */}
        {/* expensive shader , particle , can see in webgpu but not in webglrender..*/}

        {/* <WebgpuTest5 /> */}
        {/* fire shader r3f. doesn't work with webgpu*/}

        {/* <FireShader /> */}

        {/* fire shader three js , webgl renders , but webgpu doesn't because of shadermaterial is not supported.*/}

        {/* <FireShaderVanThree /> */}
      </header>
    </div>
  );
}

export default App;
