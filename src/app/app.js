/*
* Углем наметил на правом боку, место куда стрелять... (А. Ахматова)
 */

import DomRender from './renders/DomRender';
import GameService from './services/GameService';

import "normalize.css/normalize.css";

export default class App {
    constructor(config = {}) {
        this.render = new DomRender(window);
        this.gameService = new GameService();
    }

    run() {
        this.gameService.start(this.render);
    }
}