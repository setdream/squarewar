import uuid from 'uuid-js';
import Victor from 'victor';

import Rectangle from './Rectangle';

import GAME_OBJECT_TYPES from './../consts/game-object.types';
import PHYSIC_TYPES from './../consts/physic.types';

import { getRandomAngle } from '../helpers/helpers';

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
        const rotate = this.physics.get(PHYSIC_TYPES.KINEMATIC).rotate;

        const size = ~~(this.size.width / 2);
        let direction = opt.direction;
        let speed = (opt.energy / this.size.width) + this.speed;

        return [
            {
                size,
                position: [this.position.x, this.position.y],
                direction: direction + 45 * opt.k,
                speed: opt.speed,
                rotate: {
                    value: rotate.getValue(),
                    to: getRandomAngle()
                },
            },
            {
                size,
                position: [this.center.x + .5, this.center.y + .5],
                direction: direction - 45 * opt.k,
                speed: opt.speed,
                rotate: {
                    value: rotate.getValue(),
                    to: getRandomAngle()
                }
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