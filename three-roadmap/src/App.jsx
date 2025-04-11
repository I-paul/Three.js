import React, { useState,useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
  const canvasRef = useRef(null);
  const [animate,setanimate]=useState(false);
  useEffect(() => {
    const scene = new THREE.Scene();
    const cbgeometry = new THREE.BoxGeometry(1, 1, 1);
    const cbmaterial = new THREE.MeshBasicMaterial({ color: "red" });

    const cbmesh = new THREE.Mesh(cbgeometry, cbmaterial);
    scene.add(cbmesh);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    window.addEventListener("resize", () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", () => {});
      renderer.dispose();
    };
  }, []);
  const triggerAnimation = () => {
    setanimate(!animate);
  }
  return (
    <>
      <button className="button" onClick={triggerAnimation}></button>
      <div className={`render ${animate ? 'show' : ''}`}>
        <canvas ref={canvasRef} className="three-canvas"></canvas>
      </div>
    </>
  );
};

export default App;