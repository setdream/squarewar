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
        this.handleCollapse = this.handleCollapse.bind(this);

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

    handleCollapse(config) {
        this.factory.makeSquare(config);
        this.factory.makeSquare(config);
    }

    collision(go1, go2, opt) {
        if (go1.isCollapsed && go2.isCollapsed) {
            // const collapseCfg1 = go1.collapse();
            // const collapseCfg2 = go2.collapse();
            go1.collapse(go2, opt);
            //this.createChildren(collapseCfg1, collapseCfg2);
        } else {
            go1.shock(go2, {
                penetration: opt.penetration,
                onCollapse: this.handleCollapse
            });
        }
    }

    tick(dt) {
        this.each((gameObject) => {
            gameObject.physics.forEach((physic) => physic.calculate(dt));
        });

        this.collisionPhysic.calculate(this.collision);

        this.make();
    }
}