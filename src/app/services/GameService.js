import Square from '../game-objects/Square';
import MainScene from '../scenes/MainScene';
import { makeTimer } from '../helpers/helpers';

export default class GameService {
    constructor() {
        this.animationFrameId = null;

        this.scene = new MainScene();
        this.scene.add(new Square(10));
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