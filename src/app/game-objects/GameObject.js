import uuid from 'uuid-js';

const DEFAULT_LAYER_VALUE = 0;

export default class GameObject {
    constructor(opt = {}) {
        this.id = uuid.create().hex;
        this.isCollapsed = opt.isCollapsed || false;
        this.layer = opt.layer || DEFAULT_LAYER_VALUE;
    }
}