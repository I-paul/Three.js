import {  useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Level5 = () => {

    const canvasRef = useRef(null);

    return (
        <>
            <div className={`render`}>
            <canvas ref={canvasRef} className="three-canvas"></canvas>
            </div>
        </>
    );
}

export default Level5;