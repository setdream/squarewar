import BaseScene from '../libs/BaseScene';
import CollisionPhysic from '../physics/CollisionPhysic';


export default class MainScene extends BaseScene {
    constructor() {
        super();

        this.collisionPhysic = new CollisionPhysic(this);
    }

    tick(dt) {
        const scene = this;

        scene.each((gameObject) => {
            gameObject.physics.forEach((physic) => physic.calculate(dt));
        });

        scene.collisionPhysic.calculate((go1, go2, opt = {}) => {
            
            // if (go1.type === go2.type) {
            //     this.gameObjects.delete(go1.id);
            //     this.gameObjects.delete(go2.id);
            // } else {
                go1.collision(go2, {...opt, direction: opt.penetration.direction});
                go2.collision(go1, {...opt, direction: {
                    x: -opt.penetration.direction.x,
                    y: -opt.penetration.direction.y
                }});
            // }

        });
    }
}