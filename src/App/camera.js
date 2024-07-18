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
        this.instance.position.z = 5;
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
    }
}