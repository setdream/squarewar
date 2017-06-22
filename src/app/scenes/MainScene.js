
export default class MainScene {
    gameObjects = [];
    
    constructor() {

    }

    add(gameObject) {
        this.gameObjects.push(gameObject);
    }

    toArray() {
        return this.gameObjects;
    }
}