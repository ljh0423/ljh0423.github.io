// earth.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Set up scene, camera, and renderer
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;

// Create a sphere for the Earth
const geometry = new SphereGeometry(1, 32, 32);
const textureLoader = new TextureLoader();
const texture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const material = new MeshBasicMaterial({ map: texture });
const earth = new Mesh(geometry, material);
scene.add(earth);

// Position the camera
camera.position.z = 3;

// Add ambient light
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light
const directionalLight = new DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}

animate();
