import Victor from 'victor';
import TYPES from '../consts/physic.types';
import { toRadians } from '../helpers/helpers';

export default class KinematicsPhysic {
    type = TYPES.KINEMATIC;

    constructor(gameObject, opt = {}) {
        this.gameObject = gameObject;
        this.speed = opt.speed;
        this.rotate = opt.rotate || {
            value: 0,
            speed: 0,
            current: 0
        };

        this.direction = opt.direction || 0;
    }

    isNeedRotate() {
        return this.rotate.value > 0;
    }

    rotateTo(rotate) {
        const angle = toRadians(rotate);
        const center = this.gameObject.center;

        this.gameObject.vertices = this.gameObject.vertices.map((corner) => {
            return new Victor(
                center.x + (corner.x - center.x) * Math.cos(angle) - (corner.y - center.y) * Math.sin(angle),
                center.y + (corner.x - center.x) * Math.sin(angle) + (corner.y - center.y) * Math.cos(angle)
            );
        });
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
        
        this.rotateTo(this.rotate.current);
    }

    shock(shokObj, opt = {}) {
        this.direction = opt.direction + (Math.random() > 0.5 ? 45 : -45);
        this.rotate = {
            ...this.rotate, 
            speed: 30,
            value: this.rotate.current + 30
        };
    }

    updateRotate(rotate) {
        this.rotate.value -= rotate;
        this.rotate.current += rotate;
    }

    calculate(dt) {
        if (this.speed > 0) {
            const speedPerFrame = this.speed * dt,
                angle = toRadians(this.direction);

            if (this.isNeedRotate()) {
                this.updateRotate(this.rotate.speed * dt);
            }

            this.move([
                speedPerFrame * Math.cos(angle),
                speedPerFrame * Math.sin(angle),
            ]);
        }
    }
}
