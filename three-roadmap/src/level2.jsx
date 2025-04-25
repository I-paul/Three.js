import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Level2 = () => {
    const canvasRef = useRef(null);
    const [animate, setanimate] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        const scene = new THREE.Scene();
        const cbgeometry = new THREE.SphereGeometry(12, 32, 32);
        const cbmaterial = new THREE.MeshBasicMaterial({ color: "blue", wireframe: true });

        const cbmesh = new THREE.Mesh(cbgeometry, cbmaterial);

        scene.add(cbmesh);
        const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
        );
        camera.position.z = 30;
        const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        });
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
  }, [animate]);

  const triggerAnimation = () => {
    setanimate(!animate);
  };
    return (
        <>
            <button className="button" onClick={triggerAnimation}> Show
            </button>
            <div className={`render ${animate ? "show" : ""}`}>
            <canvas ref={canvasRef} className="three-canvas"></canvas>
            </div>
        </>
    );
}

export default Level2;