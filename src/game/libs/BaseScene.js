/*
 *  ...Милый! не дрогнет твоя рука,
 *  И мне недолго терпеть.
 *  Вылетит птица - моя тоска... (А. А. Ахматова)
 */

import uuid from 'uuid-js';
import BaseRepositary from './BaseRepositary';
import GAME_OBJECT_TYPES from './../consts/game-object.types';


export default class BaseScene extends BaseRepositary {
    type = GAME_OBJECT_TYPES.SCENE;

    constructor() {
        super();
        
        this.id = uuid.create().hex;
    }
};