import * as THREE from 'three';

import App from '../app';

import { inputStore } from '../Utils/store';

export default class AnimationController {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.avatar = this.app.world.character.avatar;

        inputStore.subscribe((input) => this.onInput(input));

        this.instantiatedAnimations();
    }

    instantiatedAnimations() {
        this.mixer = new THREE.AnimationMixer(this.avatar.scene);

        this.animations = new Map();
        this.avatar.animations.forEach((clip) => {
            this.animations.set(clip.name, this.mixer.clipAction(clip));
        });

        this.currentAction = this.animations.get('IDLE');
        this.currentAction.play();
    }

    playAnimation(name) {
        if(this.currentAction === this.animations.get(name)) return;
        const action = this.animations.get(name);
        action.reset();
        action.play();
        action.crossFadeFrom(this.currentAction, 0.2);

        this.currentAction = action;
    }

    onInput(input) {
        if (
            input.forward ||
            input.backward ||
            input.left ||
            input.right
        ) {
            this.playAnimation('RUN');
        } else {
            this.playAnimation('IDLE');
        }
    }

    loop(deltaTime) {
        this.mixer.update(deltaTime);
    }
}