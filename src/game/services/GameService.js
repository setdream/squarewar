/*
 * Тогда, когда любовей с нами нет,
 * тогда, когда от холода горбат, (И. А. Бродский)
 */

import MainScene from '../scenes/MainScene';
import { makeTimer } from '../helpers/helpers';

export default class GameService {
    constructor(config) {
        this.animationFrameId = null;

        this.scene = new MainScene(config);
    }

    stop() {
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);

            this.animationFrameId = null;
        }
    }

    start(requestAnimationFrame, render) {
        const timer = makeTimer(Date.now());
        const callback = () => {
            render.draw();
            this.scene.tick(timer(Date.now()));

            requestAnimationFrame(callback);
        }

        render.init(this.scene);

        this.animationFrameId = requestAnimationFrame(callback);
    }
}