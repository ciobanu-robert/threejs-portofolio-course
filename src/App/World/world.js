import * as THREE from 'three';

import App from '../app';
import Physics from "./physics";
import Enviroment from './enviroment';
import Character from './character';

import { appStateStore } from '../Utils/store';

export default class World {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.physics = new Physics();
        appStateStore.subscribe(state => {
            if (state.physicsReady) {
                this.enviroment = new Enviroment();
                this.character = new Character();
            }
        });

        this.loop();
    }

    loop(deltaTime, elapsedTime) {
        this.physics.loop();
        if(this.character) {
            this.character.loop();
        }
    }
}