import * as THREE from 'three';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
// ant model
class Ant {
    constructor() {
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
        this.headBox.position.x = 1.1;
        this.headBox.position.y = 0.2;
        
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        this.headMesh = new THREE.Mesh(geometry, this.material);

        this.headBox.add(this.headMesh); 
        this.antSystem.add(this.headBox);
    }
    // method to create
    createBackPart() {
        this.backBox = new THREE.Object3D(); // only the mesh 
        this.backBox.position.x = -1.6;
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
        //leg 1
        this.legBox1 = new THREE.Object3D(); // only the mesh
        this.leg1 = this.createLeg([0, 1, 0], [0, 2, 0], [0, -2, 3]);
        this.legBox1.add(this.leg1);

        //leg 2
        this.legBox2 = new THREE.Object3D(); // only the mesh
        this.leg2 = this.createLeg([0.2, 1, 0], [0.2, 2, 0], [0.2, -2, 3]);
        this.legBox2.add(this.leg2);

        //leg 3
        
        this.legBox3 = new THREE.Object3D(); // only the mesh
        this.leg3 = this.createLeg([-0.2, 1, 0], [-0.2, 2, 0], [-0.2, -2, 3]);
        this.legBox3.add(this.leg3);

        this.midPartBox.add(this.legBox1);
        this.midPartBox.add(this.legBox2);
        this.midPartBox.add(this.legBox3);
    }

    createAntenas(){
        const points = [
            new THREE.Vector3(-0.5, 0, 0),
            new THREE.Vector3(0.5, 1.2, ),
            new THREE.Vector3(1, 1.5, 0),
        ];
        //antena 1
        this.antenaBox1 = new THREE.Object3D(); // only the mesh

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this.antena1 = new THREE.Line(geometry, this.material);
        this.antenaBox1.add(this.antena1);

        
        this.antenaBox1.position.x = 0.5;
        this.antenaBox1.position.z = 0.4;
     
    
        // //antena 2
        this.antenaBox2 = new THREE.Object3D(); 

        this.antena2 = new THREE.Line(geometry, this.material);
        this.antenaBox2.add(this.antena2);

        this.antenaBox2.position.x = 0.5;
        this.antenaBox2.position.z = -0.4;

        this.headBox.add(this.antenaBox1);
        this.headBox.add(this.antenaBox2);


    }
}

export default Ant;