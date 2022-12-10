import * as THREE from 'three';

class Sugar{
    constructor(){
        this.geometry = new THREE.ConeGeometry( 2, 1.5, 15 );
        this.material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
        this.mesh.position.set(x,0.2,z);
    }
}

export default Sugar;