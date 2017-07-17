import BaseScene from '../libs/BaseScene';
import CollisionPhysic from '../physics/CollisionPhysic';
import Factory from '../libs/Factory';
import PHYSIC_TYPES from '../consts/physic.types';

import { getRandomInterval } from '../helpers/helpers';


export default class MainScene extends BaseScene {
    constructor(config) {
        super();

        this.config = config;
        this.factory = new Factory(this, config);
        this.collisionPhysic = new CollisionPhysic(this);
        
        this.factory
            .generateField()
            .generateSquares();

        this.collision = this.collision.bind(this);
        this.makeGo = this.makeGo.bind(this);
    }

    makeGo(config) {
        this.factory.makeSquare(config);
    }

    collision(go1, go2, opt) {
        opt.minSize = this.config.minSize;
        opt.cb = this.makeGo;

        go1.collision(go2, opt);
        go2.collision(go1, {...opt, direction: {
            x: -opt.direction.x,
            y: -opt.direction.y
        }});
    }

    tick(dt) {
        const scene = this;

        scene.each((gameObject) => {
            gameObject.physics.forEach((physic) => physic.calculate(dt));
        });

        scene.collisionPhysic.calculate(this.collision);
    }
}