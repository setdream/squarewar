import BaseScene from '../libs/BaseScene';
import CollisionPhysic from '../physics/CollisionPhysic';
import Factory from '../libs/Factory';
import BaseRepositary from '../libs/BaseRepositary';
import PHYSIC_TYPES from '../consts/physic.types';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

import { getRandomInterval } from '../helpers/helpers';
import { getSpeedAfterShock } from '../helpers/physic';


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
        this.handleClick = this.handleClick.bind(this);

        this.on('removed', () => {
            if (this.countByKey('type', GAME_OBJECT_TYPES.SQUARE) < 2) {
                this.fire('end');
            }
        });
    }

    isCanCollapse(go) {
        return (go.size.width / 2) > this.config.minSize;
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
        const speeds = getSpeedAfterShock(go1, go2);

        const isVerticalFormation = 
            Math.abs(go1.center.x - go2.center.x) > Math.abs(go1.center.y - go2.center.y);
      
        const k = isVerticalFormation ? 
            (go1.center.x > go2.center.x ? -1 : 1) : 
            (go1.center.y > go2.center.y ? 1 : -1)

        if (this.isCanCollapse(go1)) {
            this.toCreateList(go1.getChildrensCfg({
                direction: angle,
                k: k,
                speed: speeds[0],
            }));
        }

        if (this.isCanCollapse(go2)) {
            this.toCreateList(go2.getChildrensCfg({
                direction: angle + 180,
                k: -k,
                speed: speeds[1],
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

    handleClick(center) {
        const [x, y] = [
            center[0] - this.config.maxSize/2, 
            center[1] - this.config.maxSize/2
        ];
        const size = this.config.maxSize;

        if (this.isFreeSpace(x, y, size)) {
            this.toCreateList({
                position: [x, y],
                size: size
            });
        }
    }
}