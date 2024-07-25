import * as THREE from 'three';

import Camera from './camera';
import Renderer from './renderer';
import Loop from './Utils/loop';
import World from './World/world';
import Resize from './Utils/resize';
import AssetLoader from './Utils/asset.loader';
import Preloader from './UI/preloader';
import InputController from './UI/input.controller';
import GUI from './Utils/GUI';
import ModalManager from './UI/modal.manager';

let instance = null;

export default class App {
    constructor() {
        if(instance) return instance;
        instance = this;

        window.ModalManager = new ModalManager();

        this.canvas = document.querySelector("canvas.threejs");
        this.scene = new THREE.Scene();
        this.gui = new GUI();
        this.assetLoader = new AssetLoader();
        this.preloader = new Preloader();
        this.inputController = new InputController();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();
        this.loop = new Loop();
        this.resize = new Resize();
    }
}