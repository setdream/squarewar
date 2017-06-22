import { Square } from '../game-objects/Square';
import { MainScene } from '../scenes/MainScene';

export default class GameService {
    constructor() {
        this.scene = new MainScene();

        this.scene.add(new Square());
    }

    run(render) {
       window.requestAnimationFrame(() => render.draw(this.scene.toArray()));
    }
}