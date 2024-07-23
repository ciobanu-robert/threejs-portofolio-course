import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { sizesStore } from './Utils/store';

import App from './app'

export default class Camera {
    constructor() {
        this.app = new App();
        this.canvas = this.app.canvas;

        this.sizes = sizesStore.getState();
        this.sizesStore = sizesStore;

        this.setInstance();
        this.setControls();
        this.setResizeListener();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            200,
        );
        this.instance.position.z = 100;
        this.instance.position.y = 20;
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    setResizeListener() {
        this.sizesStore.subscribe((sizes) => {
            this.instance.aspect = sizes.width / sizes.height;
            this.instance.updateProjectionMatrix();
        });
    }

    loop() {
        this.controls.update();
        this.characterController = this.app.world.characterController?.rigidBody;
        if (this.characterController) {
            const characterPosition = this.characterController.translation();
            const characterRotation = this.characterController.rotation();

            const cameraOffset = new THREE.Vector3(0, 30, 55);
            cameraOffset.applyQuaternion(characterRotation);
            cameraOffset.add(characterPosition);

            const targetOffset = new THREE.Vector3(0, 10, 0);
            targetOffset.applyQuaternion(characterRotation);
            targetOffset.add(characterPosition);

            this.instance.position.lerp(cameraOffset, 0.05);
            this.controls.target.lerp(targetOffset, 0.05);
        }
    }
}