import uuid from 'uuid-js';

import Point from '../libs/Point';
import Interval from '../libs/Interval';

import GO_CONSTANTS from '../consts/game-object';

export default class GameObject {
    constructor(position, opt = {}) {
        this.id = uuid.create().hex;
        this.position = Point.fromArray(position); 

        this.isCollapsed = opt.isCollapsed || false;
        this.isRemoved = false;
        this.layer = opt.layer || GO_CONSTANTS.DEFAULT_LAYER_VALUE;

        this.center = [];
        this.vertices = [];

        this.scale = opt.scale || 1;

        this.physics = new Map();
    }

    getCenterCords() {}

    getVerticesCords() {}

    addPhysic(physic) {
        this.physics.set(physic.type, physic);
    }

    remove() {
        this.isRemoved = true;
    }
}