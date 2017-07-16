import MainScene from '../scenes/MainScene';
import Factory from '../libs/Factory';
import { makeTimer } from '../helpers/helpers';

export default class GameService {
    constructor(config) {
        this.animationFrameId = null;

        this.scene = new MainScene();
        this.factory = new Factory(this.scene, config);

        this.factory
            .generateField()
            .generateSquares();
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
            render.draw(this.scene.toArray());
            this.scene.tick(timer(Date.now()));

            requestAnimationFrame(callback);
        }

       this.animationFrameId = requestAnimationFrame(callback);
    }
}