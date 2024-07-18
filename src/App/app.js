import * as THREE from 'three';

import Camera from './camera';
import Renderer from './renderer';
import Loop from './Utils/loop';
import World from '../World/world';
import Resize from './Utils/resize';

let instance = null;

export default class App {
    constructor() {
        if(instance) return instance;
        instance = this;

        this.canvas = document.querySelector("canvas.threejs");
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        this.loop = new Loop();
        this.resize = new Resize();
    }
}