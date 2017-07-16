import uuid from 'uuid-js';
import Victor from 'victor';
import Point from '../libs/Point';
import GO_CONSTANTS from '../consts/game-object';

export default class GameObject {
    constructor(position = DEFAULT_OBJECT_POSITION, opt = {}) {
        this.id = uuid.create().hex;

        // Position as Radius-vector
        this.position = Point.fromArray(position); 

        this.isCollapsed = opt.isCollapsed || false;
        this.layer = opt.layer || GO_CONSTANTS.DEFAULT_LAYER_VALUE;

        this.physics = new Map();
    }

    addPhysic(physic) {
        this.physics.set(physic.type, physic);
    }
}