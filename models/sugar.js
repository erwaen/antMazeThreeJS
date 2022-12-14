import * as THREE from 'three';

class Sugar{
    constructor(){
        this.sugarBox = new THREE.Object3D();

        this.geometry = new THREE.ConeGeometry( 2, 1.5, 15 );
        this.material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
        this.sugarBox.position.set(x, 0, z);
        this.mesh.position.y = 0.2
        this.sugarBox.add(this.mesh);

        this.luzPunta = new THREE.PointLight(0xffffff, 0.5, 15);
        this.luzPunta.position.y = 1.9;
        this.luzPunta.distance = 4;
        this.luzPunta.intensity = 2;
        this.sugarBox.add(this.luzPunta);
    }
}

export default Sugar;