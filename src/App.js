
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
class App extends Component {
  componentDidMount() {
    // Scene
    var scene = new THREE.Scene(); // Scene
    scene.add(new THREE.AxesHelper(5)); // Add Axes Helper

    // Light
    const light = new THREE.SpotLight();  // Basic Light
    light.position.set(20, 20, 20); // Set Light Position
    scene.add(light); // Add Light to Scene

    // Camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); // Camera
    camera.position.z = 5; // Position Camera

    // Renderer
    var renderer = new THREE.WebGLRenderer(); // Renderer
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize( window.innerWidth, window.innerHeight ); // Renderer Size
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    
    // Mount Renderer
    this.mount.appendChild( renderer.domElement ); // Mount Renderer to Child
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Textures
    const envTexture = new THREE.CubeTextureLoader().load([
      'img/px_50.png',
      'img/nx_50.png',
      'img/py_50.png',
      'img/ny_50.png',
      'img/pz_50.png',
      'img/nz_50.png'
  ]);
  envTexture.mapping = THREE.CubeReflectionMapping;

    // Geometry
    //var geometry = new THREE.BoxGeometry( 1, 1, 1 ); // Geometry
    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // Material
    // const material = new THREE.MeshPhysicalMaterial({
    //   color: 0x00ff00,
    //   envMap: envTexture,
    //   metalness: 0.25,
    //   roughness: 0.1,
    //   opacity: 1.0,
    //   transparent: false,
    //   transmission: 0.99,
    //   clearcoat: 1.0,
    //   clearcoatRoughness: 0.25
    // });
    // STL Loader
    const loader = new STLLoader()
    loader.load(
        'models/CUPS2.stl',
        function (geometry) {
            var material = new THREE.MeshPhongMaterial( { opacity: 1, vertexColors: true } );

            const mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)
        },
        (error) => {
            console.log(error)
        }
    )
    // var cube = new THREE.Mesh( geometry, material ); // Cube
    // scene.add( cube ); // Add Cube
    var animate = function () { // Animate
      requestAnimationFrame( animate );
      controls.update();
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} /> // Add Ref to Component Where to Mount
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;

// Can this be exported with UV texture map?