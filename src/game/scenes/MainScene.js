import BaseScene from '../libs/BaseScene';
import CollisionPhysic from '../physics/CollisionPhysic';
import Factory from '../libs/Factory';
import Repositary from '../libs/Repositary';
import PHYSIC_TYPES from '../consts/physic.types';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

import { getRandomInterval } from '../helpers/helpers';


export default class MainScene extends BaseScene {
    constructor(config) {
        super();

        this.config = config;
        this.configRepository = new Repositary();
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

    createChildren(go1, go2, penetration) {
        const angle = penetration.angleDeg();

        const isVerticalFormation = 
            Math.abs(go1.center.x - go2.center.x) > Math.abs(go1.center.y - go2.center.y);
      
        const k = isVerticalFormation ? 
            (go1.center.x > go2.center.x ? -1 : 1) : 
            (go1.center.y > go2.center.y ? 1 : -1)

        if (go1.size.width > 20) {
            this.toCreateList(go1.getChildrensCfg({
                isVerticalFormation,
                direction: angle,
                k: k,
            }));
        }

        if (go2.size.width > 20) {
            this.toCreateList(go2.getChildrensCfg({
                isVerticalFormation,
                direction: angle + 180,
                k: -k
            }));
        }
    }

    collision(go1, go2, opt) {
        
        /*
         * Penetration resolve
         */
        go1.leave(opt.penetration);

        if (go1.isCollapsed && go2.isCollapsed) {
            this.createChildren(go1, go2, opt.penetration);

            this.remove(go1.id);
            this.remove(go2.id);
        } else {
            go1.shock(go2, {
                penetration: opt.penetration
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