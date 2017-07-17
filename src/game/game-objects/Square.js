import Rectangle from './Rectangle';
import GAME_OBJECT_TYPES from './../consts/game-object.types';
import PHYSIC_TYPES from './../consts/physic.types';

import { getRandomDirection } from '../helpers/helpers';

export default class Square extends Rectangle {
    constructor(position, size, opt = {}) {
        super(position, size, size, opt);

        this.isCollapsed = true;
        this.type = GAME_OBJECT_TYPES.SQUARE;
    }

    collapse(opt) {
        const kinematic = opt.kinematic;
        const direction = kinematic.direction;
        const newSize = this.size.width / 2;

        if (newSize > opt.minSize) {
            kinematic.direction = getRandomDirection(180, 359);
            this.size.width = newSize;
            this.size.height = newSize;

            opt.cb({
                type: GAME_OBJECT_TYPES.SQUARE,
                size: newSize,
                direction: getRandomDirection(0, 179),
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
                kinematic: kinematic
            });
        } else {
            kinematic.direction = getRandomDirection(kinematic.direction + 91, 178);
        }
    }
}