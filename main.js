import './style.css'
import * as THREE from 'three';

import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(80);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(gridHelper, ambientLight);


function createTorus(){
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
  const torus = new THREE.Mesh(geometry, material);
  return torus;
}

const torus = createTorus();
scene.add(torus);

// Create the ant system or like a invisible box that contain de ANT
const antSystem = new THREE.Object3D();
antSystem.position.y = 1.5;
scene.add(antSystem);

const texture = new THREE.TextureLoader().load('dark-concrete-texture-background.jpg');

// ################### MID PART OF THE BODY (SPEHERE and Legs)###################
// body mid mesh
const midBodyMesh = new THREE.Object3D(); // only the mesh
antSystem.add(midBodyMesh);


// sphere of the body 
let geometry = new THREE.SphereGeometry(1, 32, 32);
let material = new THREE.MeshStandardMaterial({color: 0xfffffff, map: texture});
const antBodyMid = new THREE.Mesh(geometry, material);
midBodyMesh.add(antBodyMid);

// TODO: Create the legs of the ant


// ################### HEAD OF THE BODY (SPHERE y Antenas)###################
const headAntMesh = new THREE.Object3D();
headAntMesh.position.x = 1.1;
headAntMesh.position.y = 0.2;
antSystem.add(headAntMesh);

geometry = new THREE.SphereGeometry(1.05, 32, 32);
material = new THREE.MeshStandardMaterial({color: 0xfffffff, map: texture});
const antHead = new THREE.Mesh(geometry, material);
headAntMesh.add(antHead);

// TODO: ANTENA


// ################### BACK PART OF THE BODY (SPHERE Only, no mesh necessary)###################
geometry = new THREE.SphereGeometry(1.4, 32, 32);
material = new THREE.MeshStandardMaterial({color: 0xfffffff, map: texture});
const antBack = new THREE.Mesh(geometry, material);
antBack.position.x = -1.6;
antBack.position.y = 0.4;
//antBack.position.y = 0.2
antSystem.add(antBack);




function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();