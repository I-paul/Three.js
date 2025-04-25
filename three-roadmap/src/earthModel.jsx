import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Earth = () => {
    const canvasRef = useRef(null);
    const [animate, setanimate] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        const scene = new THREE.Scene();
        const loader = new THREE.TextureLoader();
        const texture = loader.load("/earth/Albedo.jpg");
        const geometry = new THREE.SphereGeometry(3, 32, 32);
        const material = new THREE.MeshLambertMaterial();
        material.metalness = 0.5;
        material.roughness = 0.5;
        material.map = texture;
        material.map.wrapS = THREE.RepeatWrapping;
        material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set(1, 1);
        const earth = new THREE.Mesh(geometry, material);

        const Alight = new THREE.AmbientLight(0xffffff, 0.2);
        Alight.position.set(0, 0, 0).normalize();
        scene.add(Alight);
        const Plight = new THREE.PointLight(0xffffff, 1.4, 1);
        Plight.position.set(5, 5, 5).normalize();
        scene.add(Plight);

        scene.add(earth);


        const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
        );
        camera.position.z = 10;
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
        <>
            <button className="button" onClick={triggerAnimation}> Show
            </button>
            <div className={`render ${animate ? "show" : ""}`}>
            <canvas ref={canvasRef} className="three-canvas"></canvas>
            </div>
        </>
    );
}

export default Earth;