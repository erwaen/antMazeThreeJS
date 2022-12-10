import './style.css'
import * as THREE from 'three';

import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import Ant from './models/ant.js';
import AntMaze from './models/antMaze.js';

let isAntCameraOn = true;

const antMaze = new AntMaze();
const ant = new Ant();
antMaze.scene.add(ant.antSystem);

// helpers

// v keycode 

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 86) {
        isAntCameraOn = !isAntCameraOn; // toggle cameras
        ant._resetCamera();
    }
    
        // < keyboard
    // } else if (keyCode == 83) {
    //     cube.position.y -= ySpeed;
    // } else if (keyCode == 65) {
    //     cube.position.x -= xSpeed;
    // } else if (keyCode == 68) {
    //     cube.position.x += xSpeed;
    // } else if (keyCode == 32) {
    //     cube.position.set(0, 0, 0);
};

function animate(){
  requestAnimationFrame(animate);
  antMaze.controls.update();
  if (isAntCameraOn){
    antMaze.renderer.render(antMaze.scene, ant.camera);
  }else{
    antMaze.renderer.render(antMaze.scene, antMaze.camera);
  }
  
  ant.Update(antMaze);



}


animate();