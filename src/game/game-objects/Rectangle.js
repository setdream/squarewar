import Victor from 'victor';

import GameObject from './GameObject';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

export default class Rectangle extends GameObject {
    constructor(position, size, opt = {}) {
        super(position, opt);

        this.size = size;
        this.type = GAME_OBJECT_TYPES.RECTANGLE;
        this.isCollapsed = false;

        this.center = Victor.fromArray(this.getCenterCords());

        this.vertices = this.getVerticesCords()
            .map(cords => Victor.fromArray(cords));
    }

    getCenterCords() {
        const {x, y} = this.position;
        const {width, height} = this.size;
    
        return [x + width/2, y + height/2];
    }

    getVerticesCords() {
        const {x, y} = this.position;
        const {width, height} = this.size;

        return [
            [x, y],
            [x + width, y],
            [x + width, y + height],
            [x, y + height]
        ];
    }

    shock() {}

    leave() {}
}