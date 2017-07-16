import BaseScene from '../libs/BaseScene';
import CollisionPhysic from '../phisics/CollisionPhysic';


export default class MainScene extends BaseScene {
    constructor() {
        super();

        this.collisionPhysic = new CollisionPhysic(this.data);
    }

    tick(dt) {
        const gameObjects = this.data;
        gameObjects.forEach((gameObject) => {
            gameObject.physics.forEach((physic) => physic.calculate(dt));
        });

        this.collisionPhysic.calculate((id1, id2, opt = {}) => {
            const go1 = gameObjects.get(id1);
            const go2 = gameObjects.get(id2);
            
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