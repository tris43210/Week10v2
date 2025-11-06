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
camera.position.setZ(60);

renderer.render( scene, camera );

// const geometry = new THREE.TorusGeometry(
// 	radius, tubeRadius,
// 	radialSegments, tubularSegments )

const geometry = new THREE.TorusGeometry( 16, 5, 30, 100)

// Basic material not affected by light source

//three sets of materials Basic, Lambert, Phong 

// const material = new THREE.MeshBasicMaterial({color:'red', wireframe: true})
const material = new THREE.MeshStandardMaterial({color:'red'})

// Assigning the geometry and material to the torus shape

const torus = new THREE.Mesh (geometry, material);

scene.add(torus)

const gltfLoad = new GLTFLoader();
gltfLoad.load('./public/nike_air_max_akatsuki/scene.gltf', function(nikeModel) {
    scene.add(nikeModel.scene)
})


// Directional lighting
const lightIntensity = 1400
const pointLight = new THREE.PointLight(0xffffff, lightIntensity)
pointLight.position.set(0,0,20)
// Shows a mesh 'helper' that visualises where the point light is coming from
const lightHelper = new THREE.PointLightHelper(pointLight)

//create base grid

const gridHelper = new THREE.GridHelper(200,50);


scene.add(pointLight, lightHelper, gridHelper)


// Flat Lighting
const color = 0xffffff;
const intensity = 10;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);


const controls = new OrbitControls(camera, renderer.domElement);

// Render/Animation Loop Below 

// request animation frame is similar to setInterval except that when you navigate away 
// from the page requestAnimationFrame pauses the animation

function addStar() {
    const geometry = new THREE.SphereGeometry(.25,24,24); 
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry,material)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 )); 

    star.position.set(x, y, z); 
    scene.add(star)

}

Array(600).fill().forEach(addStar); 

const spaceTexture = new THREE.TextureLoader().load('public/0203049~medium.jpg');
scene.background = spaceTexture;

function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.001;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    renderer.render( scene, camera);
}
animate()

function moveCamera() {
        const t = document.body.getBoundingClientRect().top;
            nikeModel.rotation.x += 0.05;
                nikeModel.rotation.y += 0.05;
                    nikeModel.rotation.z += 0.05;

                        camera.position.z = t * -0.01
                            camera.position.y = t * -0.01
                                camera.position.x = t * -0.01


                                }
                                document.body.onscroll = moveCamera
}