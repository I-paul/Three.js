import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import AlbedoTex from "./assets/earth/Albedo.jpg";
import NightLightsTex from "./assets/earth/night_lights_modified.png";
import CloudsTex from "./assets/earth/Clouds.png";
import BumpTex from "./assets/earth/Bump.jpg";          
import OceanTex from "./assets/earth/Ocean.png";       

const Earth = () => {
    const canvasRef = useRef(null);
    const [animate, setanimate] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;
        const scene = new THREE.Scene();
        const earthGroup = new THREE.Group();
        earthGroup.rotation.x = Math.PI / 6;
        scene.add(earthGroup);

        const loader = new THREE.TextureLoader();
        const Earthtexture = loader.load(AlbedoTex);
        const LightsTexture = loader.load(NightLightsTex);
        const CloudsTexture = loader.load(CloudsTex);
        const BumpTexture = loader.load(BumpTex);    
        const oceanTexture = loader.load(OceanTex);     


        const geometry = new THREE.IcosahedronGeometry(3, 12);
        const BaseMaterial = new THREE.MeshLambertMaterial();
        BaseMaterial.metalness = 12;
        BaseMaterial.roughness = 0.5;
        BaseMaterial.map = Earthtexture;
        BaseMaterial.map.wrapS = THREE.RepeatWrapping;
        BaseMaterial.map.wrapT = THREE.RepeatWrapping;
        BaseMaterial.map.repeat.set(1, 1);
        const earth = new THREE.Mesh(geometry, BaseMaterial);
        earthGroup.add(earth);

        const LightMaterial = new THREE.MeshBasicMaterial();
        LightMaterial.map = LightsTexture;
        LightMaterial.blending = THREE.AdditiveBlending;

        const Lights= new THREE.Mesh(geometry, LightMaterial);
        earthGroup.add(Lights);

        const CloudMaterial = new THREE.MeshLambertMaterial();
        CloudMaterial.map = CloudsTexture;
        CloudMaterial.transparent = true;
        CloudMaterial.blending = THREE.AdditiveBlending;

        const Clouds = new THREE.Mesh(geometry, CloudMaterial);
        Clouds.scale.setScalar(1.01);
        earthGroup.add(Clouds);

        const sunlight = new THREE.DirectionalLight(0xffffff, 1);
        sunlight.position.set(5, 3, 5);
        scene.add(sunlight);



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
        controls.dampingFactor = 0.05;

        window.addEventListener("resize", () => {
            const aspect = window.innerWidth / window.innerHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const loop = () => {
            controls.update();
            earthGroup.rotation.y += 0.001;
            Clouds.rotation.y += 0.0015; 
            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener("resize", () => { });
            renderer.dispose();
        };
    });
    return (
        <>

            <div className={`render`}>
                <canvas ref={canvasRef} className="three-canvas"></canvas>
            </div>
        </>
    );
}

export default Earth;