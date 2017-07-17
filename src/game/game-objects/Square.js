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

    update(params = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);

        this.size = {
            width: params.size,
            height: params.size
        };

        kinematic.speed = params.speed;
        kinematic.direction = params.direction;
    }

    collapse(opt) {
        const direction = opt.direction;
        const newSize = this.size.width / 2;

        if (newSize > opt.minSize) {
            opt.cb({
                id: this.id,
                speed: opt.speed,
                size: newSize,
                direction: addDirection(direction, -45)
            });

            opt.cb({
                id: uuid.create().hex,
                type: GAME_OBJECT_TYPES.SQUARE,
                size: newSize,
                speed: opt.speed,
                direction: addDirection(direction, 45),
                position: [
                    this.position.x + newSize + 1, 
                    this.position.y + newSize + 1
                ]
            });
        } else {
            this.remove();
        }
    }

    collision(collisionObj, opt = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);
        const speed = kinematic.speed;
        const collisionObjDirection = collisionObj.physics.get(PHYSIC_TYPES.KINEMATIC).direction;
        const {x, y, direction} = opt;

        const size = this.size.width;
        const collSize = collisionObj.size.width;

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
                direction: collisionObjDirection,
                speed: (size > collSize) ? 
                    speed - (1/size * speed) : speed + (1/collSize * speed)
            });
        } else {
            kinematic.direction = getRandomDirection(collisionObjDirection, 45);
        }
    }
}