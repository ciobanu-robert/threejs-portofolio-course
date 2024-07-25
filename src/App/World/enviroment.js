import * as THREE from 'three';

import App from '../app';
import Portal from './portal';
import ModalContentProvider from '../UI/modal.content-provide';

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
        this.addPortals();
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
            child.traverse((obj) => {
                if (obj.isMesh) {
                    obj.castShadow = shadowCasters.some((keyword) => child.name.includes(keyword));
                    obj.receiveShadow = shadowReceivers.some((keyword) => child.name.includes(keyword));
                    if (physicalObjects.some((keyword) => child.name.includes(keyword))) {
                        this.physics.add(obj, "fixed", "cuboid");
                    }
                }
            })
        }
    }

    addPortals() {
        const portalMesh1 = this.enviroment.scene.getObjectByName('portal');
        const portalMesh2 = this.enviroment.scene.getObjectByName('portal001');
        const portalMesh3 = this.enviroment.scene.getObjectByName('portal002');

        const modalContentProvider = new ModalContentProvider();

        this.portal1 = new Portal(portalMesh1, modalContentProvider.getModalInfo('aboutMe'));
        this.portal2 = new Portal(portalMesh2, modalContentProvider.getModalInfo('projects'));
        this.portal3 = new Portal(portalMesh3, modalContentProvider.getModalInfo('contactMe'));
    }

    loop() {
        this.portal1.loop();
        this.portal2.loop();
        this.portal3.loop();
    }
}