import * as THREE from 'three';

import App from '../app';
import Physics from "./physics";
import Enviroment from './enviroment';
import Character from './character';

import { appStateStore } from '../Utils/store';
import CharacterController from './character.controller';

export default class World {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.physics = new Physics();
        const unsub = appStateStore.subscribe(state => {
            if (state.physicsReady && state.assetsReady) {
                this.enviroment = new Enviroment();
                this.character = new Character();
                this.characterController = new CharacterController();
                unsub();
            }
        });

        this.loop();
    }

    loop(deltaTime, elapsedTime) {
        this.physics.loop();
        if(this.characterController) {
            this.characterController.loop();
        }
    }
}