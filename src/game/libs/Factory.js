import { getRandomInterval } from '../helpers/helpers';

import Square from '../game-objects/Square';
import Rectangle from '../game-objects/Rectangle';

import KinematicsPhysic from '../physics/KinematicsPhysic';

import CONSTS from '../consts/common';
import GAME_OBJECT_TYPES from '../consts/game-object.types';
import PHYSIC_TYPES from '../consts/physic.types';

const OBJECT_TYPES_TABLE = {
    [GAME_OBJECT_TYPES.SQUARE]: Square,
    [GAME_OBJECT_TYPES.RECTANGLE]: Rectangle
}

const PHYSIC_TYPES_TABLE = {
    [PHYSIC_TYPES.KINEMATIC]: KinematicsPhysic
}

export default class Factory {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config;
    }

    generateField() {
        const { field } = this.config;

        this.make({
            type: GAME_OBJECT_TYPES.RECTANGLE,
            position: [-1, 0],
            size: {
                width: 1,
                height: field.height
            },
            speed: 0,
            direction: 0,
            physics: [PHYSIC_TYPES.KINEMATIC]          
        });

        this.make({
            type: GAME_OBJECT_TYPES.RECTANGLE,
            position: [field.width, 0],
            size: {
                width: 1,
                height: field.height
            },
            speed: 0,
            direction: 180,
            physics: [PHYSIC_TYPES.KINEMATIC]          
        });

        this.make({
            type: GAME_OBJECT_TYPES.RECTANGLE,
            position: [0, -1],
            size: {
                width: field.width,
                height: 1
            },
            speed: 0,
            direction: 90,
            physics: [PHYSIC_TYPES.KINEMATIC]          
        });

        this.make({
            type: GAME_OBJECT_TYPES.RECTANGLE,
            position: [0, field.height],
            size: {
                width: field.width,
                height: 1
            },
            speed: 0,
            direction: 270,
            physics: [PHYSIC_TYPES.KINEMATIC]          
        });

        return this;
    }

    make(config) {
        let go = new (OBJECT_TYPES_TABLE[config.type])(config.position, config.size);

        if (Array.isArray(config.physics)) {
            config.physics.forEach(type => {

                go.addPhysic(new (PHYSIC_TYPES_TABLE[type])(go, {
                    speed: config.speed,
                    direction: config.direction
                }));
            });
        }

        this.scene.add(go);
    }

    makeSquare(config) {
        this.make({
            type: GAME_OBJECT_TYPES.SQUARE,
            direction: config.direction,
            size: config.size,
            position: config.position,
            speed: config.speed || getRandomInterval(this.config.minSpeed, this.config.maxSpeed),
            physics: [PHYSIC_TYPES.KINEMATIC]
        });
    }

    generateSquares() {
        const {
                minSize, 
                maxSize: realMaxSize,
                minSpeed,
                maxSpeed,
                field
            } = this.config;
        const maxSize = this.config.maxSize + CONSTS.SPACE;
        const padding = CONSTS.SPACE / 2;
        let count = this.config.count;

        const CeilCountX = ~~(field.width / maxSize);
        const CeilCountY = ~~(field.height / maxSize);

        for(let i = 0; i < CeilCountY && count > 0; i++) {
            for(let j = 0; j < CeilCountX && count > 0; j++, count--) {
                this.make({
                    type: GAME_OBJECT_TYPES.SQUARE,
                    position: [maxSize * j + padding, i * maxSize + padding],
                    size: realMaxSize,
                    speed: getRandomInterval(minSpeed, maxSpeed),
                    direction: (45 * j) % 360,
                    physics: [PHYSIC_TYPES.KINEMATIC]
                });
            }
        }

        return this;
    }
}