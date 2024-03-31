import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function MyThree() {
    const refContainer = useRef(null);
    useEffect(() => {
        const gui = new dat.GUI();
        const parameters = {
            color: 0x00ff00,
            spin: () => {
                gsap.to(cube.rotation, { duration: 1, x: cube.rotation.x + Math.PI * 2 });
            },
        };
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Add damping effect for smoother movement
        controls.dampingFactor = 0.25; // Adjust damping strength
        controls.enableZoom = true; // Enable zooming
        controls.autoRotate = true;

        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        refContainer.current.appendChild(renderer.domElement);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;

        // var animate = function () {
        //     requestAnimationFrame(animate);
        //     cube.rotation.x += 0.01;
        //     cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        // };
        // animate();
        //debugger
        gui.add(cube.position, "x", -3, 3)
            .name("x")
            .step(0.01)
            .onChange(() => renderer.render(scene, camera));
        gui.add(cube.position, "y", -3, 3)
            .name("elevation")
            .step(0.01)
            .onChange(() => renderer.render(scene, camera));
        gui.add(cube.position, "z", -3, 3)
            .name("z")
            .step(0.01)
            .onChange(() => renderer.render(scene, camera));
        gui.add(cube, "visible").onChange(() => renderer.render(scene, camera));
        gui.add(cube.material, "wireframe").onChange(() => renderer.render(scene, camera));
        gui.addColor(parameters, "color").onChange(() => {
            material.color.set(parameters.color);
            return renderer.render(scene, camera);
        });
        gui.add(parameters, "spin").onChange(() => renderer.render(scene, camera));
    }, []);

    return <div ref={refContainer}></div>;
}

export default MyThree;
