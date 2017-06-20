/*
* Углем наметил на правом боку, место куда стрелять... (А. Ахматова)
 */

import "normalize.css/normalize.css";

export default class App {
    constructor() {
        console.log('Init App...');
    }

    run() {
        console.log('Run App...', {...{a: 3}, ...{b: 2}});
    }

    test() {
        return -1;
    }
}