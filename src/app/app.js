/*
* Углем наметил на правом боку, место куда стрелять... (А. Ахматова)
 */

import DomRender from './renders/DomRender';
import GameService from './services/GameService';
import { getRequestAnimationFrame } from './helpers/helpers';

import "normalize.css/normalize.css";

export default class App {
    constructor(config = {}) {
        this.gameService = new GameService();
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

    run(container) {
        this.gameService.start(getRequestAnimationFrame(), new DomRender(document, container));
    }
}