import Victor from 'victor';
import GameObject from './GameObject';
import Interval from '../libs/Interval';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

export default class Rectangle extends GameObject {
    constructor(position, size, opt = {}) {
        super(position, opt);

        this.size = size;
        this.type = GAME_OBJECT_TYPES.RECTANGLE;
        this.isCollapsed = false;

        const {x, y} = this.position;
        const {width, height} = size;

        this.center = new Victor(
            x + width/2, 
            y + height/2);

        this.vertices = [
            new Victor(x, y),
            new Victor(x + width, y),
            new Victor(x + width, y + height),
            new Victor(x, y + height),
        ];
    }

    getAxes() {
        const len = this.vertices.length;

        return this.vertices.map((vertex, index) => {
            const edge = vertex.clone().subtract(
                this.vertices[(index + 1) == len ? 0 : index + 1]);

            return new Victor(edge.y, -edge.x).norm();
        });
    }

    project(axis) {
        let min = axis.dot(this.vertices[0]);
        let max = min;

        for (let i = 1; i < this.vertices.length; i++) {
            let p = axis.dot(this.vertices[i]);

            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }

        return new Interval(min, max);
    }

    shock() {}
}