import GameObject from GameObject;

const DEFAULT_SQUARE_SPEED = 0;

export default class Square {
    constructor(size, opt = {}) {
        super(opt);
        
        this.speed = opt.speed || DEFAULT_SQUARE_SPEED;
        this.size = size; 
    }
}