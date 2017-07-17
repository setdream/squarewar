import TYPES from '../consts/physic.types';
import { toRadians } from '../helpers/helpers';

export default class KinematicsPhysic {
    type = TYPES.KINEMATIC;

    constructor(gameObject, opt = {}) {
        this.gameObject = gameObject;
        this.speed = opt.speed;

        this.direction = opt.direction || 0;

    }

    calculate(dt) {
        const speedPerFrame = this.speed * dt,
              angle = toRadians(this.direction);

        if (this.speed > 0) {
            this.gameObject.position.add([
                speedPerFrame * Math.cos(angle),
                speedPerFrame * Math.sin(angle),
            ]);
        }
    }
}