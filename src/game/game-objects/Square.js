import Rectangle from './Rectangle';
import Victor from 'victor';
import GAME_OBJECT_TYPES from './../consts/game-object.types';
import PHYSIC_TYPES from './../consts/physic.types';
import uuid from 'uuid-js';

import { getRandomDirection, addDirection } from '../helpers/helpers';

export default class Square extends Rectangle {
    constructor(position, size, opt = {}) {
        super(position, {width: size, height: size}, opt);

        this.isCollapsed = true;
        this.type = GAME_OBJECT_TYPES.SQUARE;
        this.scale = opt.scale || 1;
    }

    collapse() {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);

        const cfg = {
            center: {
                x: this.center.x,
                y: this.center.y
            },
            size: this.size.width,
            direction: kinematic.direction,
            speed: kinematic.speed
        };

        this.remove();

        return cfg;
    }

    getChildrensCfg(opt = {}) {
        const size = ~~(this.size.width / 2);

        let positions = [];
        let direction = opt.direction;

        if (opt.isVerticalFormation) {
            positions = [
                [this.center.x, this.center.y - size - .5],
                [this.center.x, this.center.y + .5]
            ];
        } else {
            positions = [
                [this.center.x - size + .5, this.center.y],
                [this.center.x + .5, this.center.y]
            ];
        }

        return [
            {
                size,
                position: positions[0],
                direction: direction + 45 * opt.k,
            },
            {
                size,
                position: positions[1],
                direction: direction - 45 * opt.k,
            }
        ];
    }
    
    leave(penetration) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);

        kinematic.move([penetration.x, penetration.y]);
    }

    shock(shockObj, opt = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);

        kinematic.shock(shockObj, {
            direction: opt.penetration.angleDeg()
        });
    }
}