import Rectangle from './Rectangle';
import GAME_OBJECT_TYPES from './../consts/game-object.types';
import PHYSIC_TYPES from './../consts/physic.types';
import uuid from 'uuid-js';

import { getRandomDirection, addDirection } from '../helpers/helpers';

export default class Square extends Rectangle {
    constructor(position, size, opt = {}) {
        super(position, {width: size, height: size}, opt);

        this.isCollapsed = true;
        this.type = GAME_OBJECT_TYPES.SQUARE;
    }

    collapse(opt) {
        const kinematic = opt.kinematic;
        const direction = opt.direction;
        const newSize = this.size.width / 2;

        if (newSize > opt.minSize) {
            kinematic.direction = addDirection(direction, 45);
            this.size.width = newSize;
            this.size.height = newSize;

            opt.cb({
                id: uuid.create().hex,
                type: GAME_OBJECT_TYPES.SQUARE,
                size: newSize,
                direction: addDirection(direction, -45),
                position: [
                    this.position.x + newSize + 2, 
                    this.position.y + newSize + 2
                ]
            });
        } else {
            this.remove();
        }
    }

    collision(collisionObj, opt = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);
        const collisionObjDirection = collisionObj.physics.get(PHYSIC_TYPES.KINEMATIC).direction;
        const {x, y, direction} = opt;

        if (x < y) {
            const dx = collisionObj.isCollapsed ? x / 2 : x;
            
            this.position.add([dx * direction.x, 0]);
        } else {
            const dy = collisionObj.isCollapsed ? y / 2 : y;

            this.position.add([0, dy * direction.y]);
        }

        if (this.type === collisionObj.type) {
            this.collapse({
                minSize: opt.minSize,
                cb: opt.cb,
                kinematic: kinematic,
                direction: collisionObjDirection
            });
        } else {
            kinematic.direction = getRandomDirection(collisionObjDirection, 45);
        }
    }
}