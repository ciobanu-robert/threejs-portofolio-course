import * as THREE from 'three';

import App from '../app';
import ModalManager from '../UI/modal.manager';

export default class Portal {
    constructor(portalMesh, modalInfo) {
        this.app = new App();
        this.portalMesh = portalMesh;
        this.modalInfo = modalInfo;
        this.modalManager = new ModalManager();

        this.portalMesh.material.transparent = true;
        this.portalMesh.material.opacity = 0.8;

        this.prevIsNear = false;
    }

    loop() {
        this.character = this.app.world.character?.instance;
        if (this.character) {
            const portalPosition = new THREE.Vector3();
            this.portalMesh.getWorldPosition(portalPosition);

            const distrance = this.character.position.distanceTo(portalPosition);
            const isNear = distrance < 1.5;
            if (isNear) {
                if (!this.prevIsNear) {
                    this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description);
                }
                this.prevIsNear = true;
            } else {
                if (this.prevIsNear) {
                    this.modalManager.closeModal();
                }
                this.prevIsNear = false;
            }
        }
    }
}