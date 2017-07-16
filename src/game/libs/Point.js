/*
 * Class for Abstract Point in 2D
 */
export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromArray([x, y]) {
        return new Point(x, y);
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
    }

    add([x, y]) {
        this.x += x;
        this.y += y;
    }

    subtract([x, y]) {
        this.x -= x;
        this.y -= y;
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