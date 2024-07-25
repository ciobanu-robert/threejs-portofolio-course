import * as THREE from 'three';

import App from '../app';

import assetStore from '../Utils/asset.store';

export default class Character {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;
        this.assetStore = assetStore.getState();
        this.avatar = this.assetStore.loadedAssets.avatar;

        const geometry = new THREE.BoxGeometry(.6, 2, .6);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x00ff00 ,
            wireframe: true,
            visible: false,
        });
        this.instance = new THREE.Mesh(geometry, material);
        this.instance.position.set(0, 1, 0);
        this.scene.add(this.instance);

        const avatar = this.avatar.scene;
        avatar.rotation.y = Math.PI;
        avatar.position.y = -1;
        this.instance.add(avatar);
    }
}