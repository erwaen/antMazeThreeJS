import * as THREE from 'three';
import Sugar from './sugar.js';
import {MapControls, OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';




class AntMaze{
    constructor () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg'),
        })
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.setZ(80);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.ambientLight = new THREE.AmbientLight(0xffffff);
        this.gridHelper = new THREE.GridHelper(200, 200);
        // this.scene.add(this.gridHelper, this.ambientLight);
        
        this.torus = this.createTorus();
        this.scene.add(this.torus);

        this.plane = this.createFloor();
        this.scene.add(this.plane);

        this.numOfSugar = 20;
        this._sugars = [];
        for(let i = 0; i < this.numOfSugar; i++){
            this._sugars.push(this.createRandomSugar());
            this.scene.add(this._sugars[i].mesh);
        }

        

        
    }

    get sugarsMesh(){
        let x = this._sugars.map(sugar => sugar);
        // console.log(x);
        return x;
    }

    removeSugar(sugar){
        this.scene.remove(sugar.mesh);
        // remove sugar from _sugars
        this._sugars = this._sugars.filter(s => s !== sugar);
        
        this.numOfSugar--;
        console.log(this.numOfSugar);
        
    }

  

    createTorus(){
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
        const torus = new THREE.Mesh(geometry, material);
        return torus;
    }
    createFloor(){
        this.mesaTexture = new THREE.TextureLoader().load('./assets/table2.jpeg');
        let geometry = new THREE.PlaneGeometry( 200, 200 );
        let material = new THREE.MeshStandardMaterial( { map: this.mesaTexture} );
        const plane = new THREE.Mesh( geometry, material );
        plane.rotateX(-Math.PI / 2);
        return plane;
    }

    createRandomSugar(){
        const sugar = new Sugar();
        return sugar;
    }

    

    
}

export default AntMaze;