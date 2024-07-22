import * as THREE from 'three';

import App from '../app';

import { appStateStore } from '../Utils/store';

export default class Physics {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.meshMap = new Map();

        import('@dimforge/rapier3d').then(RAPIER => {
            const gravity = {x: 0, y: -9.81, z:0};
            this.world = new RAPIER.World(gravity);
            this.rapier = RAPIER;

            this.rapierLoader = true;
            appStateStore.setState({physicsReady: true})
        });
    }

    add(mesh, type, collider) {
        let rigidBodyType;
        if (type === 'dynamic') {
            rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
        } else if (type = 'fixed') {
            rigidBodyType = this.rapier.RigidBodyDesc.fixed();
        }
        this.rigidBody = this.world.createRigidBody(rigidBodyType);

        let colliderType
        switch (collider) {
            case 'cuboid':
                const dimentions = this.computeCuboidDimentions(mesh);
                colliderType = this.rapier.ColliderDesc.cuboid(
                    dimentions.x / 2,
                    dimentions.y / 2,
                    dimentions.z / 2
                );
                this.world.createCollider(colliderType, this.rigidBody);
                break;
            case 'ball':
                const radius = this.computeBallDimentions(mesh);
                colliderType = this.rapier.ColliderDesc.ball(radius);
                this.world.createCollider(colliderType, this.rigidBody);
                break;
            case 'trimesh':
                const { scaledVerticies, indicies } = this.computeTrimeshDimentions(mesh);
                colliderType = this.rapier.ColliderDesc.trimesh(
                    scaledVerticies,
                    indicies,
                );
                this.world.createCollider(colliderType, this.rigidBody);
                break;
        }

        const worldPosition = mesh.getWorldPosition(new THREE.Vector3());
        const worldRotation = mesh.getWorldQuaternion(new THREE.Quaternion());
        this.rigidBody.setTranslation(worldPosition);
        this.rigidBody.setRotation(worldRotation);

        this.meshMap.set(mesh, this.rigidBody);
    }

    computeCuboidDimentions(mesh) {
        mesh.geometry.computeBoundingBox();
        const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
        const worldScale = mesh.getWorldScale(new THREE.Vector3());
        return size.multiply(worldScale);
    }

    computeBallDimentions(mesh) {
        mesh.geometry.computeBoundingSphere();
        const radius = mesh.geometry.boundingSphere.radius;
        const worldScale = mesh.getWorldScale(new THREE.Vector3());
        const maxScale = Math.max(worldScale.x, worldScale.y, worldScale.z);
        return radius * maxScale;
    }

    computeTrimeshDimentions(mesh) {
        const verticies = mesh.geometry.attributes.position.array;
        const indicies = mesh.geometry.index.array;
        const worldScale = mesh.getWorldScale(new THREE.Vector3());

        const scaledVerticies = verticies.map((vertex, index) => {
            return vertex * worldScale.getComponent(index % 3);
        });
        
        return { scaledVerticies, indicies }
    }

    loop() {
        if(!this.rapierLoader) return;

        this.world.step();

        this.meshMap.forEach((rigidBody, mesh) => {
            const position = new THREE.Vector3().copy(rigidBody.translation());
            const rotation = new THREE.Quaternion().copy(rigidBody.rotation());

            position.applyMatrix4(
                new THREE.Matrix4().copy(mesh.parent.matrixWorld).invert()
            );

            const inverseParentMatrix = new THREE.Matrix4()
            .extractRotation(mesh.parent.matrixWorld)
            .invert();
            const inverseParentRotation =
            new THREE.Quaternion().setFromRotationMatrix(inverseParentMatrix);
            rotation.premultiply(inverseParentRotation);

            mesh.position.copy(position);
            mesh.quaternion.copy(rotation);
        });
    }
}