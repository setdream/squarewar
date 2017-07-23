import { getRandomSpeed } from '../../helpers/helpers';

const MAX_ANGLE_DEGREE = 360;
const HALF_CIRCLE_DEGREE = 180;

export default class Rotate {
    constructor(config = {}) {
        this.value = (config.value || 0) % MAX_ANGLE_DEGREE;
        this.speed = config.speed || getRandomSpeed();

        this.rotateTo(config.to);
    }

    rotateTo(to = 0) {
        this.direction = this.getDirection(to);
        this.to = to;
    }

    getDirection(to) {
        return Math.abs(this.value - to) > HALF_CIRCLE_DEGREE ? -1 : 1;
    }

    getValue() {
        return this.value;
    }

    isNeedToRotate() {
        return this.to > 0;
    }

    calculate(dt) {
        if (this.isNeedToRotate()) {
            const step = dt * this.speed;

            this.value += this.direction * step;
            this.to -= step;
        }
    }
};