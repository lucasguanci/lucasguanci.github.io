/**
 * LocAR.js Tutorial - Part 2
 * https://github.com/AR-js-org/locar.js/blob/master/docs/tutorial/part2.md
**/
import * as THREE from 'three';
import * as LocAR from 'locar';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.001, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;    
    camera.updateProjectionMatrix();
});
const box = new THREE.BoxGeometry(2,2,2);
const cube = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0xff0000 }));

const locar = new LocAR.LocationBased(scene, camera);
const cam = new LocAR.WebcamRenderer(renderer);

// Create the device orientation tracker
const deviceOrientationControls = new LocAR.DeviceOrientationControls(camera);
deviceOrientationControls.disconnect()
deviceOrientationControls.connect()

console.log(locar);

locar.startGps();
console.log(locar.initialPosition)

console.log(cube);

locar.add(cube, -0.72, 51.0501);

console.log("ecco il cubo "+cube);

renderer.setAnimationLoop(animate);


function animate() {
    // Update the scene using the latest sensor readings
    deviceOrientationControls.update();

    cam.update();
    renderer.render(scene, camera);
}



// 11.094534, 43.879913