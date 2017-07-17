import BaseScene from '../libs/BaseScene';
import CollisionPhysic from '../physics/CollisionPhysic';
import Factory from '../libs/Factory';
import BaseRepositary from '../libs/BaseRepositary';
import PHYSIC_TYPES from '../consts/physic.types';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

import { getRandomInterval } from '../helpers/helpers';


export default class MainScene extends BaseScene {
    constructor(config) {
        super();

        this.config = config;
        this.configRepository = new BaseRepositary();
        this.factory = new Factory(this, config);
        this.collisionPhysic = new CollisionPhysic(this);
        
        this.factory
            .generateField()
            .generateSquares();

        this.collision = this.collision.bind(this);
        this.toCreateList = this.toCreateList.bind(this);

        this.on('removed', () => {
            if (this.countByKey('type', GAME_OBJECT_TYPES.SQUARE) < 2) {
                this.fire('end');
            }
        });
    }

    toCreateList(config) {
        this.configRepository.add(config);
    }

    make() {
        if (this.configRepository.count() > 0) {
            this.configRepository.each(config => this.factory.makeSquare(config));
            this.configRepository.clear();
        }
    }

    collision(go1, go2, opt) {
        opt.minSize = this.config.minSize;
        opt.cb = this.toCreateList;

        go1.collision(go2, opt);
        go2.collision(go1, {...opt, direction: {
            x: -opt.direction.x,
            y: -opt.direction.y
        }});
    }

    tick(dt) {
        this.each((gameObject) => {
            gameObject.physics.forEach((physic) => physic.calculate(dt));
        });

        this.collisionPhysic.calculate(this.collision);

        this.make();
    }
}