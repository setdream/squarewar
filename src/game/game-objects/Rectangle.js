import GameObject from './GameObject';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

export default class Rectangle extends GameObject {
    constructor(position, width, height, opt = {}) {
        super(position, opt);

        this.size = {width, height};
        this.type = GAME_OBJECT_TYPES.RECTANGLE;
        this.isCollapsed = false;
    }

    collision() {

    }
}