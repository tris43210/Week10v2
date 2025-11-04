import './style.css'

import * as THREE from 'three';



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
camera.position.setZ(30);

renderer.render( scene, camera );

// const geometry = new THREE.TorusGeometry(
// 	radius, tubeRadius,
// 	radialSegments, tubularSegments )

const geometry = new THREE.TorusGeometry( 11, 5, 16, 100)

// Basic material not affected by light source

//three sets of materials Basic, Lambert, Phong 

// const material = new THREE.MeshBasicMaterial({color:'red', wireframe: true})
const material = new THREE.MeshStandardMaterial({color:'red'})

// Assigning the geometry and material to the torus shape

const torus = new THREE.Mesh (geometry, material);

scene.add(torus)

// Directional lighting
const lightIntensity = 1400
const pointLight = new THREE.PointLight(0xffffff, lightIntensity)
pointLight.position.set(0,0,20)
// Shows a mesh 'helper' that visualises where the point light is coming from
const lightHelper = new THREE.PointLightHelper(pointLight)

scene.add(pointLight, lightHelper)


// Flat Lighting
const color = 0xFFFFFF;
const intensity = 10;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

// Render/Animation Loop Below 

// request animation frame is similar to setInterval except that when you navigate away 
// from the page requestAnimationFrame pauses the animation
function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    renderer.render( scene, camera);
}
animate()