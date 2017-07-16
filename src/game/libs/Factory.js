import { getRandomInterval } from '../helpers/helpers';
import Square from '../game-objects/Square';
import Rectangle from '../game-objects/Rectangle';
import KinematicsPhisic from '../phisics/KinematicsPhisic';

export default class Factory {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config;
    }

    generateField() {
        const { field } = this.config;

        this.scene.add([
            new Rectangle([0, 0], 1, field.height),
            new Rectangle([field.width - 1, 0], 1, field.height),
            new Rectangle([1, 0], field.width - 2, 1),
            new Rectangle([1, field.height - 1], field.width - 2, 1)
        ]);

        return this;
    }

    generateSquares() {
        const {
                minSize, 
                maxSize: realMaxSize,
                minSpeed,
                maxSpeed,
                field
            } = this.config;
        const maxSize = this.config.maxSize + 1;
        let count = this.config.count;

        const CeilCountX = ~~(field.width / maxSize);
        const CeilCountY = ~~(field.height / maxSize);

        for(let i = 0; i < CeilCountY && count > 0; i++) {
            for(let j = 0; j < CeilCountX && count > 0; j++, count--) {

                let square = new Square([maxSize * j, i * maxSize], getRandomInterval(minSize, realMaxSize));
                square.addPhysic(new KinematicsPhisic(square, {
                    speed: getRandomInterval(minSpeed, maxSpeed),
                    direction: getRandomInterval(0, 360)
                }));

                this.scene.add(square);
            }
        }

        return this;
    }
}