import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Level2 from "./level2";
import Earth from "./earthModel";
import Text3D from "./text";

const App = () => {
	const canvasRef = useRef(null);
	const [animate, setanimate] = useState(false);

	useEffect(() => {
		if (!canvasRef.current) return;

		const scene = new THREE.Scene();
		const cbgeometry = new THREE.BoxGeometry(1, 1, 1);
		const cbmaterial = new THREE.MeshLambertMaterial({ color: "red" });
		const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
		const points = [];
		points.push(new THREE.Vector3(- 3, 0, 0));
		points.push(new THREE.Vector3(0, 0, 0));
		points.push(new THREE.Vector3(3, 0, 0));

		const geometry = new THREE.BufferGeometry().setFromPoints(points);

		const cbmesh = new THREE.Mesh(cbgeometry, cbmaterial);
		cbmesh.position.x = 3;
		const linemesh = new THREE.Line(geometry, material);

		const cbmesh3 = new THREE.Mesh(cbgeometry, cbmaterial);
		cbmesh3.position.x = -3;

		const grp = new THREE.Group();
		grp.add(cbmesh);
		grp.add(linemesh);
		grp.add(cbmesh3);
		scene.add(grp);

		const Alight = new THREE.AmbientLight(0xffffff, 1);
		Alight.position.set(0, 0, 0).normalize();
		scene.add(Alight);
		const Plight = new THREE.PointLight(0xffffff, 3, 12);
		Plight.castShadow = true;
		Plight.position.set(8, 3, 0).normalize();
		scene.add(Plight);
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
			grp.rotation.y += 0.001;
			grp.rotation.x += 0.01;
			renderer.render(scene, camera);
			requestAnimationFrame(loop);
		};

		loop();

		return () => {
			window.removeEventListener("resize", () => { });
			renderer.dispose();
		};
	}, [animate]);

	const triggerAnimation = () => {
		setanimate(!animate);
	};

	return (
		<Router>
			<nav>
				<Link className="link" to="/">Home</Link> | <Link className="link" to="/level2">Sphere</Link> | <Link className="link" to="/level3">Earth</Link> | <Link className="link" to="/level4">Text</Link>
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
				<Route path="/level4" element={<Text3D />} />
			</Routes>
		</Router>
	);
};


export default App;