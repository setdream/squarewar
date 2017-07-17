/*
 *   Углем наметил на левом боку
 *   Место, куда стрелять,
 */

import DomRender from './renders/DomRender';
import GameService from './services/GameService';
import CONSTANTS from './consts/common';
import { getRequestAnimationFrame } from './helpers/helpers';

import "normalize.css/normalize.css";

export default class App {
    constructor(config = {}) {
        this.gameService = new GameService({
            ...{
                minSize: CONSTANTS.SQUARE.MIN_SIZE,
                maxSize: CONSTANTS.SQUARE.MAX_SIZE,
                count: CONSTANTS.SQUARE.COUNT,
                maxSpeed: CONSTANTS.SQUARE.MAX_SPEED,
                minSpeed: CONSTANTS.SQUARE.MIN_SPEED,
            },
            field: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            ...config
        }, config.gameEndCallback);
    }

    init() {
        return new Promise(function(resolve, reject) {
            if (document.readyState === 'complete') {
                resolve(document);
            } else {
                document.addEventListener('DOMContentLoaded', () => resolve(document));
            }
        });
    }

    run(document, container) {
        this.gameService.start(getRequestAnimationFrame(), new DomRender(document, container));
    }
}