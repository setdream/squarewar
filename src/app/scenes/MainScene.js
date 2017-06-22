import KinematicsPhisic from './../phisics/KinematicsPhisic';

export default class MainScene {
    gameObjects = new Map();

    add(gameObject, opt = {}) {

        gameObject.physics.add(new KinematicsPhisic(gameObject));

        this.gameObjects.set(gameObject.id, gameObject);
    }

    tick(dt) {
        this.gameObjects.forEach((gameObject) => {
            gameObject.physics.forEach(physic => physic.calculate(dt));
        });
    }

    toArray() {
        return this.gameObjects;
    }
}