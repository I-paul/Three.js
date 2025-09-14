import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const Text3D = ({ text = "Hello 3D!", color = "Blue" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const Plight = new THREE.PointLight(0xffffff, 1, 1);
        Plight.castShadow = true;
        Plight.position.set(1, 3, 1).normalize();
        scene.add(Plight);

        // Load font and create text
        const loader = new FontLoader();
        loader.load(
            "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",
            (font) => {
                const geometry = new TextGeometry(text, {
                    font: font,
                    size: 27,
                    depth: 2,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 1,
                    bevelSize: 1.5,
                    bevelOffset: 0,
                    bevelSegments: 5,
                });
                geometry.center();
                const material = new THREE.MeshPhongMaterial({ color });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
            }
        );

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            controls.dispose();
            renderer.dispose();
            scene.clear();
        };
    }, [text, color]);

    return (
        <div className="render show">
            <canvas ref={canvasRef} className="three-canvas"></canvas>
        </div>
    );
};

export default Text3D;