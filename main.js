import './style.css'
import * as THREE from 'three';

import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import Ant from './models/ant.js';
import AntMaze from './models/antMaze.js';

const antMaze = new AntMaze();
const ant = new Ant();
antMaze.scene.add(ant.antSystem);


function animate(){
  requestAnimationFrame(animate);
  antMaze.controls.update();
  antMaze.renderer.render(antMaze.scene, ant.camera);
  // ant.antSystem.position.x += 0.03;
}

animate();