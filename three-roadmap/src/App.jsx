import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Level2 from "./level2";
import Earth from "./earthModel";

const App = () => {
  const canvasRef = useRef(null);
  const [animate, setanimate] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const cbgeometry = new THREE.BoxGeometry(1, 1, 1);
    const cbmaterial = new THREE.MeshLambertMaterial({ color: "red" });

    const cbmesh = new THREE.Mesh(cbgeometry, cbmaterial);
    cbmesh.position.x = 3;
    // const cbmesh2 = new THREE.Mesh(cbgeometry1, cbmaterial1);
    // cbmesh2.position.x = 1;
    // cbmesh2.position.y = -0.5;  
    const cbmesh3 = new THREE.Mesh(cbgeometry, cbmaterial);
    cbmesh3.position.x = -3;

    const grp = new THREE.Group();
    grp.add(cbmesh);
    // grp.add(cbmesh2);
    grp.add(cbmesh3);
    scene.add(grp);

    const Alight = new THREE.AmbientLight(0xffffff, 0.5);
    Alight.position.set(0, 0, 0).normalize();
    scene.add(Alight);
    const Plight = new THREE.PointLight(0xffffff, 3, 5);
    Plight.castShadow = true;
    Plight.position.set(0, 0, 0).normalize();
    scene.add(Plight);
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

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
        <Link className="link" to="/">Home</Link> | <Link className="link" to="/level2">Sphere</Link> | <Link className="link" to="/level3">Earth</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button className="button" onClick={triggerAnimation}>Show 
              </button>
              <div className={`render ${animate ? "show" : ""}`}>
                <canvas ref={canvasRef} className="three-canvas"></canvas>
              </div>
            </>
          }
        />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Earth />} />
      </Routes>
    </Router>
  );
};


export default App;