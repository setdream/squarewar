import GameObject from './GameObject';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

const DEFAULT_SQUARE_SPEED = 0;

export default class Square extends GameObject {
    constructor(size, opt = {}) {
        super(opt);
        
        this.speed = opt.speed || DEFAULT_SQUARE_SPEED;
        this.size = size; 
        this.type = GAME_OBJECT_TYPES.SQUARE;
    }
}