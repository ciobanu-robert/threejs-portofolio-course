import * as THREE from 'three';

import App from '../app';

import { inputStore } from '../Utils/store';

export default class Character {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;

        

        inputStore.subscribe((state) => {
            this.forward = state.forward;
            this.backward = state.backward;
            this.left = state.left;
            this.right = state.right;
        });

        this.instantiateCharacter();
    }

    instantiateCharacter() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x00ff00 ,
            wireframe: true,
        });
        this.character = new THREE.Mesh(geometry, material);
        this.character.position.set(0, 2.5, 0);
        this.scene.add(this.character);


        this.rigidBodyType =
            this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
        this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

        this.colliderType = this.physics.rapier.ColliderDesc.cuboid(1, 1, 1);
        this.collider = this.physics.world.createCollider(
            this.colliderType,
            this.rigidBody
        );

        const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
        const worldRotation = this.character.getWorldQuaternion(new THREE.Quaternion());

        this.rigidBody.setTranslation(worldPosition);
        this.rigidBody.setRotation(worldRotation);
    }

    loop() {
        const movement = new THREE.Vector3();

        if (this.forward) {
          movement.z -= 1;
        }
        if (this.backward) {
          movement.z += 1;
        }
        if (this.left) {
          movement.x -= 1;
        }
        if (this.right) {
          movement.x += 1;
        }

        movement.normalize().multiplyScalar(0.3);
    
        const newPosition = new THREE.Vector3()
          .copy(this.rigidBody.translation())
          .add(movement);
    
        this.rigidBody.setNextKinematicTranslation(newPosition);
        this.character.position.copy(this.rigidBody.translation());
    }
}