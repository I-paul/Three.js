import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Level2 from "./level2";

const App = () => {
  const canvasRef = useRef(null);
  const [animate, setanimate] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const cbgeometry = new THREE.BoxGeometry(1, 1, 1);
    const cbmaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const cbgeometry1 = new THREE.BoxGeometry(1, 2, 1);
    const cbmaterial1 = new THREE.MeshBasicMaterial({ color: "brown" });

    const cbmesh = new THREE.Mesh(cbgeometry, cbmaterial);
    const cbmesh2 = new THREE.Mesh(cbgeometry1, cbmaterial1);
    cbmesh2.position.x = 1;
    cbmesh2.position.y = -0.5;  
    const cbmesh3 = new THREE.Mesh(cbgeometry, cbmaterial);
    cbmesh3.position.x = -1;

    const grp = new THREE.Group();
    grp.add(cbmesh);
    grp.add(cbmesh2);
    grp.add(cbmesh3);
    grp.position.y = 2;
    scene.add(grp);
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
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
  }, [animate]);

  const triggerAnimation = () => {
    setanimate(!animate);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/level2">About</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button className="button" onClick={triggerAnimation}> 
              </button>
              <div className={`render ${animate ? "show" : ""}`}>
                <canvas ref={canvasRef} className="three-canvas"></canvas>
              </div>
            </>
          }
        />
        <Route path="/level2" element={<Level2 />} />
      </Routes>
    </Router>
  );
};


export default App;