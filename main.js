import './style.css'
import * as THREE from 'three';

import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import Ant from './models/ant.js';

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
const gridHelper = new THREE.GridHelper(200, 200);

// scene.add(gridHelper, ambientLight);


function createTorus(){
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
  const torus = new THREE.Mesh(geometry, material);
  return torus;
}

const torus = createTorus();
scene.add(torus);






// ############################ FLOOR ############################
const mesaTexture = new THREE.TextureLoader().load('mesa.jpg');
let geometry = new THREE.PlaneGeometry( 200, 200 );
let material = new THREE.MeshStandardMaterial( { map: mesaTexture} );
const plane = new THREE.Mesh( geometry, material );
plane.rotateX(-Math.PI / 2);
scene.add( plane );

// ############################ ANT ############################
const ant = new Ant();
scene.add(ant.antSystem);

// // Create the ant system or like a invisible box that contain de ANT
// const antSystem = new THREE.Object3D();
// antSystem.position.y = 1.5;
// antSystem.position.x = 0;
// antSystem.position.z = 7;
// scene.add(antSystem);

// const texture = new THREE.TextureLoader().load('dark-concrete-texture-background.jpg');

// // ################### MID PART OF THE BODY (SPEHERE and Legs)###################
// // body mid mesh
// const midBodyMesh = new THREE.Object3D(); // only the mesh
// antSystem.add(midBodyMesh);


// // sphere of the body 
// geometry = new THREE.SphereGeometry(1, 32, 32); 
// material = new THREE.MeshStandardMaterial({color: 0xfffffff, map: texture});
// const antBodyMid = new THREE.Mesh(geometry, material);
// midBodyMesh.add(antBodyMid);

// // ################### LEGS ###################
// const legsMesh = new THREE.Object3D(); // only the mesh
// midBodyMesh.add(legsMesh);

// const points = [];
// points.push( new THREE.Vector3( 0, 1, 0 ) );
// points.push( new THREE.Vector3( 0, 2, 0 ) );
// points.push( new THREE.Vector3( 0, -2, 3 ) );

// geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( geometry, material );
// //scene.add( line );
// legsMesh.add(line);

// const legsMesh2 = new THREE.Object3D(); // only the mesh
// midBodyMesh.add(legsMesh2);

// const points2 = [];
// points2.push( new THREE.Vector3( 0.2, 1, 0 ) );
// points2.push( new THREE.Vector3( 0.2, 2, 0 ) );
// points2.push( new THREE.Vector3( 0.2, -2, 3 ) );

// geometry = new THREE.BufferGeometry().setFromPoints( points2 );
// const line2 = new THREE.Line( geometry, material );
// //scene.add( line );
// legsMesh2.add(line2);

// const legsMesh3 = new THREE.Object3D(); // only the mesh
// midBodyMesh.add(legsMesh3);

// const points3 = [];
// points3.push( new THREE.Vector3( -0.2, 1, 0 ) );
// points3.push( new THREE.Vector3( -0.2, 2, 0 ) );
// points3.push( new THREE.Vector3( -0.2, -2, 3 ) );

// geometry = new THREE.BufferGeometry().setFromPoints( points3 );
// const line3 = new THREE.Line( geometry, material );
// //scene.add( line );
// legsMesh3.add(line3);


// // ################### HEAD OF THE BODY (SPHERE y Antenas)###################
// const headAntMesh = new THREE.Object3D();
// headAntMesh.position.x = 1.1;
// headAntMesh.position.y = 0.2;
// antSystem.add(headAntMesh);

// geometry = new THREE.SphereGeometry(1.05, 32, 32);
// material = new THREE.MeshStandardMaterial({color: 0xfffffff, map: texture});
// const antHead = new THREE.Mesh(geometry, material);
// headAntMesh.add(antHead);

// // TODO: ANTENA


// // ################### BACK PART OF THE BODY (SPHERE Only, no mesh necessary)###################
// geometry = new THREE.SphereGeometry(1.4, 32, 32);
// material = new THREE.MeshStandardMaterial({color: 0xfffffff, map: texture});
// const antBack = new THREE.Mesh(geometry, material);
// antBack.position.x = -1.6;
// antBack.position.y = 0.4;
// antSystem.add(antBack);



// ################### CREATE SUGARS ON THE SCENE ###################
function createRandomSugar(){
  const geometry = new THREE.ConeGeometry( 1, 0.5, 9 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  const sugar = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
  sugar.position.set(x,0.2,z);
  scene.add(sugar);
}
const numOfSugar = 20;
Array(numOfSugar).fill().forEach(createRandomSugar);

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();