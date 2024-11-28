// import React from "react";
// import * as THREE from "three";
// const gpuAdapter = await navigator.gpu.requestAdapter();
// const device = await gpuAdapter.requestDevice();
// const GPUTextureUsage = {
//   RENDER_ATTACHMENT: 1 << 0,
//   COPY_SRC: 1 << 1,
//   COPY_DST: 1 << 2,
//   STORAGE: 1 << 3,
//   SAMPLED: 1 << 4,
//   OUTPUT_ATTACHMENT: 1 << 5,
// };
// const WebgpuTest3 = () => {
//   const canvas = document.querySelector("#webgpu-canvas");
//   const width = (canvas.width = window.innerWidth);
//   const height = (canvas.height = window.innerHeight);
//   const buffer = device.createBuffer({
//     size: 1024,
//     usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
//   });
//   // Initialize WebGPU

//   // Create a WebGPU context
//   const context = canvas.getContext("webgpu");
//   context.configure({
//     device,
//     format: "bgra8unorm",
//     usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
//   });

//   console.log(buffer);
//   const renderPassDescriptor = {
//     colorAttachments: [
//       {
//         view: undefined, // Set in animation loop
//         loadOp: "clear",
//         clearColor: { r: 0, g: 0, b: 0, a: 1 },
//         storeOp: "store",
//       },
//     ],
//   };

//   // Create a basic water shader
//   const vertexShaderCode = `
//   @stage(vertex)
//   fn main(@location(0) position: vec3<f32>, @location(1) uv: vec2<f32>) -> @builtin(position) vec4<f32> {
//     return vec4<f32>(position, 1.0);
//   }
// `;

//   const fragmentShaderCode = `
//   @stage(fragment)
//   fn main(@location(0) fragColor: vec2<f32>) -> @location(0) vec4<f32> {
//     return vec4<f32>(fragColor.x, fragColor.y, 0.0, 1.0);
//   }
// `;

//   // Create shaders and pipeline
//   const vertexShaderModule = device.createShaderModule({
//     code: vertexShaderCode,
//   });
//   const fragmentShaderModule = device.createShaderModule({
//     code: fragmentShaderCode,
//   });
//   const pipeline = device.createRenderPipeline({
//     vertex: {
//       module: vertexShaderModule,
//       entryPoint: "main",
//       buffers: [
//         {
//           arrayStride: 8,
//           attributes: [
//             { format: "float3", offset: 0, shaderLocation: 0 },
//             { format: "float2", offset: 12, shaderLocation: 1 },
//           ],
//         },
//       ],
//     },
//     fragment: {
//       module: fragmentShaderModule,
//       entryPoint: "main",
//       targets: [{ format: "bgra8unorm" }],
//     },
//     primitive: { topology: "triangle-list" },
//     layout: "auto",
//   });

//   // Create a simple buffer for the water surface
//   const vertices = new Float32Array([
//     // x, y, z, u, v
//     -1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, -1, 0, 0.5, 1,
//   ]);
//   const vertexBuffer = device.createBuffer({
//     size: vertices.byteLength,
//     usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
//   });
//   device.queue.writeBuffer(vertexBuffer, 0, vertices);

//   // Animation loop
//   function animate() {
//     const commandEncoder = device.createCommandEncoder();
//     const textureView = context.getCurrentTexture().createView();
//     renderPassDescriptor.colorAttachments[0].view = textureView;

//     const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
//     passEncoder.setPipeline(pipeline);
//     passEncoder.setVertexBuffer(0, vertexBuffer);
//     passEncoder.draw(3, 1, 0, 0);
//     passEncoder.endPass();

//     device.queue.submit([commandEncoder.finish()]);
//     requestAnimationFrame(animate);
//   }

//   animate();

//   return <div></div>;
// };

// export default WebgpuTest3;

// // throws error about gpubufferusage not defined
