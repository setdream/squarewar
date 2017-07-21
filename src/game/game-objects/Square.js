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

    collapse(collisionObj, opt = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);
        const collKinematic = collisionObj.physics.get(PHYSIC_TYPES.KINEMATIC);
        const angle = opt.penetration.angleDeg();

        collisionObj.direction = (angle + 180) + (Math.random() > 0.5 ? 45 : -45);
        kinematic.direction = (angle) + (Math.random() > 0.5 ? 45 : -45);
        // const cfg = {
        //     size: this.size
        // };

        // this.remove();

        // return cfg;
    }

    shock(shockObj, opt = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);

        kinematic.move([opt.penetration.x, opt.penetration.y]);
        kinematic.shock(shockObj, {
            direction: opt.penetration.angleDeg()
        });
    }

    collision(collisionObj, opt = {}) {
        const kinematic = this.physics.get(PHYSIC_TYPES.KINEMATIC);
        const collKinematic = collisionObj.physics.get(PHYSIC_TYPES.KINEMATIC);
        const angle = opt.penetration.angleDeg();

        if (opt.penetration.length() > 0) {
            kinematic.move([opt.penetration.x, opt.penetration.y]);
        }

        if (collisionObj.type === this.type) {
            this.remove();
            collisionObj.remove();
            // collisionObj.direction = (angle + 180) + (Math.random() > 0.5 ? 45 : -45);
            // kinematic.direction = (angle) + (Math.random() > 0.5 ? 45 : -45);
        }

        kinematic.direction = (angle) + (Math.random() > 0.5 ? 45 : -45);
        
        // if (1 === 2 && collisionObj.type === this.type) {
        //     const direction = (collKinematic.direction) + (Math.random() > 0.5 ? 45 : -45);
        //     const collDirection = (kinematic.direction) + (Math.random() > 0.5 ? 45 : -45);
        //     collKinematic.direction  = collDirection;
        //     kinematic.direction = direction;

        //     // opt.onCollapse({
        //     //     direction: collKinematic.direction,
        //     //     size: this.size.width,
        //     //     position: this.position.clone()
        //     // });

        //     // this.remove();
        // } else {
        //     const direction = (collKinematic.direction) + (Math.random() > 0.5 ? 45 : -45);
        //     const collDirection = (kinematic.direction) + (Math.random() > 0.5 ? 45 : -45);
        //     collKinematic.direction  = collDirection;
        //     kinematic.direction = direction;
        // }
    }
}