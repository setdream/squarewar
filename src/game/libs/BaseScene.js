/*
 *  ...Милый! не дрогнет твоя рука,
 *  И мне недолго терпеть.
 *  Вылетит птица - моя тоска... (А. А. Ахматова)
 */

import uuid from 'uuid-js';
import GameRepositary from './GameRepositary';
import GAME_OBJECT_TYPES from './../consts/game-object.types';


export default class BaseScene extends GameRepositary {
    type = GAME_OBJECT_TYPES.SCENE;

    constructor() {
        super();
        
        this.id = uuid.create().hex;
    }

    isFreeSpace(x, y, size) {
        return !this.some(go =>
            go.vertices.some(vertex =>
                (vertex.x >= x && vertex.x <= x + size) && 
                    (vertex.y >= y && vertex.y <= y + size)));
    }
};