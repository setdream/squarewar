import Victor from 'victor';

import GameObject from './GameObject';
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

    shock() {}

    leave() {}
}