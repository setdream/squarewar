import uuid from 'uuid-js';
import Victor from 'victor';
import Point from '../libs/Point';
import GO_CONSTANTS from '../consts/game-object';

export default class GameObject {
    constructor(position, opt = {}) {
        this.id = uuid.create().hex;
        this.position = Point.fromArray(position); 

        this.isCollapsed = opt.isCollapsed || false;
        this.isRemoved = false;
        this.layer = opt.layer || GO_CONSTANTS.DEFAULT_LAYER_VALUE;

        this.physics = new Map();
    }

    addPhysic(physic) {
        this.physics.set(physic.type, physic);
    }

    remove() {
        this.isRemoved = true;
    }
}