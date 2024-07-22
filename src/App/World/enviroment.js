import * as THREE from 'three';

import App from '../app';

export default class Enviroment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;

        this.loadEnviroment();
        this.addGround();
        // this.addWalls();
        this.addStairs();
        this.addMeshes();
    }

    loadEnviroment() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(10, 10, 10);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
    }

    addGround() {
        const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 'turquoise' });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        this.scene.add(groundMesh);
        this.physics.add(groundMesh, 'fixed', 'cuboid');
    }

    addWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 'lightgreen' });
        const wallGeometry = new THREE.BoxGeometry(100, 10, 1);
        const wallPositions = [
            { x: 0, y:5, z:50 },
            { x: 0, y:5, z:-50 },
            { x: 50, y:5, z:0, rotation: { y: Math.PI / 2 } },
            { x: -50, y:5, z:0, rotation: { y: Math.PI / 2 } },
        ];

        wallPositions.forEach((position) => {
            const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
            wallMesh.position.set(position.x, position.y, position.z);
            if (position.rotation) {
                wallMesh.rotation.set(
                    position.rotation.x || 0,
                    position.rotation.y || 0,
                    position.rotation.z || 0
                );
            }
            this.scene.add(wallMesh);
            this.physics.add(wallMesh, 'fixed', 'cuboid');
        });
    }

    addStairs() {
        const stairMaterial = new THREE.MeshStandardMaterial({ color: 'orange' });
        const stairGeometry = new THREE.BoxGeometry(10, 1, 100);
        const stairPositions = [
            { x: 5, y: 1, z: 0 },
            { x: 15, y: 2, z: 0 },
            { x: 25, y: 3, z: 0 },
            { x: 35, y: 4, z: 0 },
            { x: 45, y: 5, z: 0 },
        ];

        stairPositions.forEach((position) => {
            const stairMesh = new THREE.Mesh(stairGeometry, stairMaterial);
            stairMesh.position.set(position.x, position.y, position.z);
            this.scene.add(stairMesh);
            this.physics.add(stairMesh, 'fixed', 'cuboid');
        })
    }

    addMeshes() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 'blue' });

        for (let i = 0; i < 100; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() + 5) * 10,
                (Math.random() - 0.5) * 10,
            );
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