/*
 *   ...И что душа? - Прошлогодний снег! 
 *   А глядишь - пронесет и так! 
 *   В наш атомный век, в наш каменный век, 
 *   На совесть цена пятак! ... (А. Галич)
 */ 
import { toDegrees } from '../helpers/helpers';


export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromArray([x, y]) {
        return new Vector(x, y);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    set([x, y]) {
        this.x = x;
        this.y = y;

        return this;
    }

    add(value) {
        const [x, y] =
            value instanceof Vector ? value.toArray() : value;
 
        this.x += x;
        this.y += y;

        return this;
    }

    subtract(value) {
        const [x, y] =
            value instanceof Vector ? value.toArray() : value;

        this.x -= x;
        this.y -= y;

        return this;
    }

    norm() {
        const len = this.length();

        this.x /= len;
        this.y /= len;

        return this;
    }

    multiply(val) {
        this.x *= val;
        this.y *= val;

        return this;
    }

    dot(vector) {
        const {x, y} = vector;

        return this.x * x + this.y * y;
    }

    angleDeg() {
        return toDegrees(Math.atan2(this.y, this.x));
    }

    length() {
        const {x, y} = this;

        return Math.sqrt(x * x + y * y);
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    toArray() {
        return [this.x, this.y];
    }

    toObject() {
        return {
            x: this.x,
            y: this.y
        };
    }
}