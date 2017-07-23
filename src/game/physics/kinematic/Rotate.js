import CONSTANTS from '../../consts/common';
import { getRandomSpeed } from '../../helpers/helpers';


export default class Rotate {
    constructor(config = {}) {
        this.value = (config.value || 0) % CONSTANTS.ANGLE.FULL;
        this.speed = config.speed || getRandomSpeed();

        this.rotateTo(config.to);
    }

    rotateTo(to = 0) {
        this.direction = this.getDirection(to);
        this.to = to;
    }

    getDirection(to) {
        return Math.abs(this.value - to) > CONSTANTS.ANGLE.HALF ? -1 : 1;
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