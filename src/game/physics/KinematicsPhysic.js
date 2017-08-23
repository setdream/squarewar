import Vector from '../libs/Vector';
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

        this.direction = opt.direction;
    }

    move(moveTo) {
        const go = this.gameObject;
        const moveVector = new Vector.fromArray(moveTo);
        
        go.position.add(moveTo);
        go.center.add(moveVector);

        const angle = toRadians(this.rotate.getValue());

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        this.gameObject.vertices = go.getVerticesCords()
            .map(cords => 
                this.getVertexVector(cords, cosA, sinA));
    }

    getVertexVector(cords, cosA, sinA) {
        const center = this.gameObject.center;

        return new Vector(
            center.x + (cords[0] - center.x) * cosA - (cords[1] - center.y) * sinA,
            center.y + (cords[0] - center.x) * sinA + (cords[1] - center.y) * cosA
        );
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
