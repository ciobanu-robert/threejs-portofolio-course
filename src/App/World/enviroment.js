import * as THREE from 'three';

import App from '../app';

import assetStore from '../Utils/asset.store';

export default class Enviroment {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.physics = this.app.world.physics;
        this.pane = this.app.gui.pane;

        this.assetStore = assetStore.getState();
        this.enviroment = this.assetStore.loadedAssets.enviroment;

        this.addLights();
        this.loadEnviroment();
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(10, 10, 10);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.camera.top = 30;
        this.directionalLight.shadow.camera.right = 30;
        this.directionalLight.shadow.camera.left = -30;
        this.directionalLight.shadow.camera.bottom = -30;
        this.directionalLight.shadow.bias = -0.001;
        this.directionalLight.shadow.normalBias = 0.072;
        this.scene.add(this.directionalLight);
    }

    loadEnviroment() {
        const enviromentScene = this.enviroment.scene;
        this.scene.add(enviromentScene);

        enviromentScene.position.set(-2.7, 0, -7.4);
        enviromentScene.rotation.y =  -.7;
        enviromentScene.scale.setScalar(1.3);

        const physicalObjects = [
            'tree',
            'terrain',
            'rock',
            'stair',
            'gate',
            'floor',
            'bush',
        ];

        const shadowCasters = [
            'tree',
            'terrain',
            'rock',
            'gate',
            'bush',
        ];

        const shadowReceivers = [
            'tree',
            'terrain',
            'rock',
            'stair',
            'gate',
            'step',
            'floor',
            'bush',
        ];

        for (const child of enviromentScene.children) {
            const isPhysicalObject = physicalObjects.some((keyoard) => child.name.includes(keyoard)); 
            if (isPhysicalObject) {
                child.traverse((obj) => {
                    if (obj.isMesh) {
                        this.physics.add(obj, 'fixed', 'cuboid');
                    }
                });
            }

            const isShadowCaster = shadowCasters.some((keyoard) => child.name.includes(keyoard)); 
            if (isShadowCaster) {
                child.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.castShadow = true;
                    }
                });
            }

            const isShadowReceiver = shadowReceivers.some((keyoard) => child.name.includes(keyoard)); 
            if (isShadowReceiver) {
                child.traverse((obj) => {
                    if (obj.isMesh) {
                        obj.receiveShadow = true;
                    }
                });
            }
        }
    }
}