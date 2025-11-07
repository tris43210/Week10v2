import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

// setting up the camera

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Renderer grabs the html canvas element via querySelector

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// set camera position and how much of the webpage 

renderer.setPixelRatio(window.devicePixelRatio); 
// Sets the viewport to the monitors resolution
renderer.setSize( window.innerWidth, window.innerHeight);
//How zoomed in we are to the object
camera.position.setZ(15);
camera.position.setY(10); 
camera.position.setX(20); 

renderer.render( scene, camera );

// const geometry = new THREE.TorusGeometry(
// 	radius, tubeRadius,
// 	radialSegments, tubularSegments )

const geometry = new THREE.TorusGeometry( 15, 1, 30, 100)

// Basic material not affected by light source
//three sets of materials Basic, Lambert, Phong 

const material = new THREE.MeshStandardMaterial({color:'red'})

// Assigning the geometry and material to the torus shape

const torus = new THREE.Mesh (geometry, material);

scene.add(torus)

let nikeModel;  

const gltfLoad = new GLTFLoader();
gltfLoad.load('./public/nike_air_max_akatsuki/scene.gltf', (gltf) => {
    nikeModel = gltf.scene;     // <-- assign to global
    nikeModel.scale.set(10, 10, 10);
    nikeModel.position.set(0, -4, 0);
    scene.add(nikeModel);
});

// Directional lighting
const lightIntensity = 1400
const pointLight = new THREE.PointLight(0xffffff, lightIntensity)
pointLight.position.set(0,0,20)

// Shows a mesh 'helper' that visualises where the point light is coming from

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight)

// Flat Lighting
const color = 0xffffff;
const intensity = 20;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);


function addStar() {
    const geometry = new THREE.SphereGeometry(.10,24,24); 
    const material = new THREE.MeshStandardMaterial({color: 0x3B3B3B});
    const star = new THREE.Mesh(geometry,material)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 )); 

    star.position.set(x, y, z); 
    scene.add(star)
}

Array(1000).fill().forEach(addStar); 


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    nikeModel.rotation.y += 0.05;
}

document.body.onscroll = moveCamera

// Render/Animation Loop Below 
// request animation frame is similar to setInterval except that when you navigate away 
// from the page requestAnimationFrame pauses the animation

function animate() {
    requestAnimationFrame(animate)
    torus.rotation.y -= 0.0005;
    nikeModel.rotation.y += 0.0009;
    renderer.render( scene, camera);
}
animate()


