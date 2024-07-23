import * as THREE from 'three';
import App from './app';
import { sizesStore } from './Utils/store';

export default class Renderer {
    constructor() {
        this.app = new App();
        this.canvas = this.app.canvas;
        this.camera = this.app.camera;
        this.scene = this.app.scene;

        this.sizes = sizesStore.getState();
        this.sizesStore = sizesStore;

        this.setInstance();
        this.setResizeListener();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antilias: true,
        });

        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
        this.instance.outputEncoding = THREE.sRGBEncoding;
    }

    setResizeListener() {
        this.sizesStore.subscribe((sizes) => {
            this.instance.setSize(sizes.width, sizes.height);
            this.instance.setPixelRatio(this.sizes.pixelRatio);
        })
    }

    loop() {
        this.instance.render(this.scene, this.camera.instance);
    }
}