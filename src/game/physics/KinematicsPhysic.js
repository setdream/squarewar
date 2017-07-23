import Victor from 'victor';
import TYPES from '../consts/physic.types';

import Rotate from './kinematic/Rotate';

import { 
        toRadians, 
        getRandomShockAngle, 
        getRandomAngle,  
        getRandomObjectDirection
    } from '../helpers/helpers';

export default class KinematicsPhysic {
    type = TYPES.KINEMATIC;

    constructor(gameObject, opt = {}) {
        this.gameObject = gameObject;
        this.speed = opt.speed;
        this.rotate = new Rotate(opt.rotate);

        this.direction = opt.direction || getRandomObjectDirection();
    }

    move(moveTo) {
        this.gameObject.position.add(moveTo);

        const {x, y} = this.gameObject.position;
        const {width, height} = this.gameObject.size;

        this.gameObject.center.add(new Victor.fromArray(moveTo));

        this.gameObject.vertices = [
            new Victor(x, y),
            new Victor(x + width, y),
            new Victor(x + width, y + height),
            new Victor(x, y + height),
        ];
        
        const angle = toRadians(this.rotate.getValue());
        const center = this.gameObject.center;

        this.gameObject.vertices = this.gameObject.vertices.map((corner) => {
            return new Victor(
                center.x + (corner.x - center.x) * Math.cos(angle) - (corner.y - center.y) * Math.sin(angle),
                center.y + (corner.x - center.x) * Math.sin(angle) + (corner.y - center.y) * Math.cos(angle)
            );
        });
    }

    shock(shokObj, opt = {}) {
        this.direction = getRandomShockAngle(opt.direction);
        this.rotate.rotateTo(getRandomAngle());
    }

    calculate(dt) {
        if (this.speed > 0) {
            const speedPerFrame = this.speed * dt,
                angle = toRadians(this.direction);

            this.rotate.calculate(dt);

            this.move([
                speedPerFrame * Math.cos(angle),
                speedPerFrame * Math.sin(angle),
            ]);
        }
    }
}
