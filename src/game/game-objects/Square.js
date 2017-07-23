import uuid from 'uuid-js';
import Rectangle from './Rectangle';

import CONSTANTS from './../consts/common';
import GAME_OBJECT_TYPES from './../consts/game-object.types';
import PHYSIC_TYPES from './../consts/physic.types';

import { getRandomAngle } from '../helpers/helpers';

export default class Square extends Rectangle {
    constructor(position, size, opt = {}) {
        super(position, {width: size, height: size}, opt);

        this.isCollapsed = true;
        this.type = GAME_OBJECT_TYPES.SQUARE;
    }

    getChildrensCfg(opt = {}) {
        const rotate = this.physics.get(PHYSIC_TYPES.KINEMATIC).rotate;
        const size = ~~(this.size.width / 2);

        return [
            {
                size,
                position: [this.position.x, this.position.y],
                direction: opt.direction + CONSTANTS.SQUARE.SHOCK_ANGLE * opt.k,
                speed: opt.speed,
                rotate: {
                    value: rotate.getValue(),
                    to: getRandomAngle()
                },
            },
            {
                size,
                position: [this.center.x + .5, this.center.y + .5],
                direction: opt.direction - CONSTANTS.SQUARE.SHOCK_ANGLE * opt.k,
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