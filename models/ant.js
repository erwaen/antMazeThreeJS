import * as THREE from 'three';
import ThirdPersonCamera from './thirdPersonCamera';

// ant model
class Ant {
    constructor() {
        this.speed = 10;
        this.direction;
        this.clock = new THREE.Clock();
        this.delta;
        this.shift = new THREE.Vector3();

        this.direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();

        


        this.antSystem = new THREE.Object3D();
        this.antSystem.position.y = 1.5;
        this.antSystem.position.x = 0;
        this.antSystem.position.z = 7;



        this.texture = new THREE.TextureLoader().load('../assets/cuerpotextura.jpg');
        this.material = new THREE.MeshStandardMaterial({ color: 0xfffffff, map: this.texture });

        this.createMidPart();
        this.createHead();
        this.createBackPart();
        
        this.createAllLegs();  
        this.createAntenas(); 
        
        this.createFlashLight();
        this.createAntLight();

        this.createFlashLightDecorator();

        this._initCamera();
        

        
        setTimeout(() => {
            console.log('hola');
        }, 3000);

              
    }

    get camera() {
        return this._camera.camera;
    }

   
    _initCamera() {
        this._camera =  new ThirdPersonCamera();
        this.antSystem.add(this._camera.camera);
        this._camera.camera.position.y = 10;
        this._camera.camera.position.z = -15;
        

        // this.camera.camera.rot
        this._camera.camera.rotateY(Math.PI);
        this._camera.camera.rotateX(-Math.PI / 4);



        
    }
    
    createMidPart() {
        this.midPartBox = new THREE.Object3D(); // only the mesh
        
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        this.midPartMesh = new THREE.Mesh(geometry, this.material);

        this.midPartBox.add(this.midPartMesh);
        this.antSystem.add(this.midPartBox);
    }
    createHead() {
        this.headBox = new THREE.Object3D(); // only the mesh
        this.headBox.position.z = -1.1;
        this.headBox.position.y = 0.2;
        
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        this.headMesh = new THREE.Mesh(geometry, this.material);

        this.headBox.add(this.headMesh); 
        this.antSystem.add(this.headBox);
    }
    // method to create
    createBackPart() {
        this.backBox = new THREE.Object3D(); // only the mesh 
        this.backBox.position.z = +1.6;
        this.backBox.position.y = 0.4;

        const geometry = new THREE.SphereGeometry(1.4, 32, 32);
        this.backMesh = new THREE.Mesh(geometry, this.material);
        
        this.backBox.add(this.backMesh);
        this.antSystem.add(this.backBox);
    }

    createLeg([x, y, z], [x2, y2, z2], [x3, y3, z3]) {
        const points = [];
        points.push(new THREE.Vector3(x, y, z));
        points.push(new THREE.Vector3(x2, y2, z2));
        points.push(new THREE.Vector3(x3, y3, z3));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, this.material);
        return line;
    }

    createAllLegs(){

        const legBasePosition1 = [0, 1, 0.3];
        const legBasePosition2 = [0.5, 2.5, 0.3]; 
        const legBasePosition3 = [1, -2, 0.3];

        this.rightLegsBox = new THREE.Object3D();
        this.rightLegsBox.position.x = 0.8;
        this.rightLegsBox.position.y = -0.4;
        

        //leg 1
        this.legRight1 = this.createLeg(legBasePosition1, legBasePosition2, legBasePosition3);
        this.rightLegsBox.add(this.legRight1);

        //leg 2
        legBasePosition1[2] -= 0.25;
        legBasePosition2[2] -= 0.25;
        legBasePosition3[2] -= 0.25;
        this.legRight2 = this.createLeg(legBasePosition1, legBasePosition2 , legBasePosition3 );
        this.rightLegsBox.add(this.legRight2);

        //leg 3
        legBasePosition1[2] -= 0.25;
        legBasePosition2[2] -= 0.25;
        legBasePosition3[2] -= 0.25;
        this.legRight3 = this.createLeg(legBasePosition1, legBasePosition2, legBasePosition3);
        this.rightLegsBox.add(this.legRight3);

        this.midPartBox.add(this.rightLegsBox);

        // LEFT LEGS
        const leftBase1 = [0, 1, 0.3];
        const leftBase2 = [-0.5, 2.5, 0.3]; 
        const leftBase3 = [-1, -2, 0.3];
        this.leftLegsBox = new THREE.Object3D();
        this.leftLegsBox.position.x = -0.8;
        this.leftLegsBox.position.y = -0.4;

        //leg 1
        this.legLeft1 = this.createLeg(leftBase1, leftBase2, leftBase3);
        this.leftLegsBox.add(this.legLeft1);

        //leg 2
        leftBase1[2] -= 0.25;
        leftBase2[2] -= 0.25;
        leftBase3[2] -= 0.25;
        this.legLeft2 = this.createLeg(leftBase1, leftBase2 , leftBase3 );
        this.leftLegsBox.add(this.legLeft2);

        //leg 3
        leftBase1[2] -= 0.25;
        leftBase2[2] -= 0.25;
        leftBase3[2] -= 0.25;
        this.legLeft3 = this.createLeg(leftBase1, leftBase2, leftBase3);
        this.leftLegsBox.add(this.legLeft3);

        this.midPartBox.add(this.leftLegsBox);


        
    }

    createAntenas(){
        const points = [
            new THREE.Vector3(0, 0, 0.5),
            new THREE.Vector3(0, 1.2, -0.5),
            new THREE.Vector3(0, 1.5, -1),
        ];
        //antena 1
        this.antenaBox1 = new THREE.Object3D(); // only the mesh

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this.antena1 = new THREE.Line(geometry, this.material);
        this.antenaBox1.add(this.antena1);

        
        this.antenaBox1.position.z = -0.5;
        this.antenaBox1.position.x = 0.4;
     
    
        // //antena 2
        this.antenaBox2 = new THREE.Object3D(); 

        this.antena2 = new THREE.Line(geometry, this.material);
        this.antenaBox2.add(this.antena2);

        this.antenaBox2.position.z = -0.5;
        this.antenaBox2.position.x = -0.4;

        this.headBox.add(this.antenaBox1);
        this.headBox.add(this.antenaBox2);
    }

    createFlashLight(){
        // crea un target (que es una caja vacia) para apuntar la luz
        this.luzTarget = new THREE.Object3D();
        this.luzTarget.position.set(0,-3,-10);
        this.headBox.add(this.luzTarget);

        // se crea la luz tipo LINTERNA
        this.spotLight = new THREE.SpotLight( 0xffffff );
        this.spotLight.position.set(0,2,-1);
        // apunto la linterna al target y otras propiedades
        this.spotLight.target = this.luzTarget;
        this.spotLight.intensity = 0.5;
        this.spotLight.distance = 15;
        this.spotLight.angle = Math.PI/4.5;
        
        this.headBox.add( this.spotLight);
    }
    createAntLight(){
        this.antLightLeft = new THREE.PointLight(0xffffff, 0.5, 15);
        this.antLightLeft.position.set(-2, 2, 0);
        this.antLightLeft.distance = 6;
        this.antLightLeft.intensity = 2;
        this.antSystem.add(this.antLightLeft);

        this.antLightRight = new THREE.PointLight(0xffffff, 0.5, 15);
        this.antLightRight.position.set(2, 2, 0);
        this.antLightRight.distance = 6;
        this.antLightRight.intensity = 2;
        this.antSystem.add(this.antLightRight);
    }

    createFlashLightDecorator(){

        //circulo amarillo
        this.FlashLightBox = new THREE.Object3D(); // only the mesh
        this.FlashLightBox.position.set(0, 0.5, -0.9);
        const geometry = new THREE.SphereGeometry(0.1, 32, 32);
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.FlashLightMesh = new THREE.Mesh(geometry, material);

        //dona negra alrededor
        this.DonutBox = new THREE.Object3D();
        this.DonutBox.position.set(0, 0.5, -0.88);
        const geometryDonut = new THREE.TorusGeometry(0.1,0.05,3,200);
        geometryDonut.rotateY(Math.PI/2);
        geometryDonut.rotateZ(Math.PI/6);
        const materialDonut = new THREE.MeshBasicMaterial( { color: 0x808080 } );
        this.DonutMesh = new THREE.Mesh(geometryDonut, materialDonut);
        
        //agregamos al box del circulo el mesh
        this.DonutBox.add(this.DonutMesh);
        this.FlashLightBox.add(this.FlashLightMesh);
        this.headBox.add(this.DonutBox);
        this.headBox.add(this.FlashLightBox);
    }

    Update(antMaze){
        if (antMaze.numOfSugar > 0){
            this.moveRandom();
        }
    }

    moveRandom(){
        
        if(this.antSystem.position.x >= 100 || this.antSystem.position.x <= -100 || this.antSystem.position.z >= 100 || this.antSystem.position.z <= -100){
            this.direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();
            // this.antSystem.rotateOnWorldAxis(this.direction);
        }

   
        this.delta = this.clock.getDelta();
        // console.log(this.delta)
        
        this.shift.copy(this.direction).multiplyScalar(this.delta*this.speed);
        console.log(this.shift);
        this.antSystem.position.add(this.shift);
        this.antSystem.lookAt(this.antSystem.position.x - this.direction.x, this.antSystem.position.y - this.direction.y, this.antSystem.position.z - this.direction.z);
        
        
        

    }
}



export default Ant;
