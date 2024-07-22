import * as THREE from 'three';

import App from '../app';

export default class Enviroment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;

        this.loadEnviroment();
        this.addGround();
        this.addMeshes();
    }

    loadEnviroment() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(10, 10 ,10);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
    }

    addGround() {
        const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({color: 'turquoise'});
        this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        this.scene.add(this.groundMesh);
        this.physics.add(this.groundMesh, 'fixed', 'cuboid');
    }

    addMeshes() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({color: 'blue'});

        for (let i = 0; i< 100; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() + 5) * 10,
                (Math.random() - 0.5) * 10,
            );
            // mesh.scale.set(
            //     Math.random() + 0.5,
            //     Math.random() + 0.5,
            //     Math.random() + 0.5,
            // );
            mesh.scale.setScalar(Math.random())
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
            );
            this.scene.add(mesh);
            this.physics.add(mesh, 'dynamic', 'ball')
        }
    }
}