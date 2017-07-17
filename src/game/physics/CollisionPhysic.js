import TYPES from '../consts/physic.types';
import { rectanglePenetration, getRandomInterval } from '../helpers/helpers';


export default class CollisionPhysic {
    type = TYPES.COLLISION;

    constructor(scene) {
        this.scene = scene;
    }

    calculate(callback = () => {}) {
        let penetration = null;

        this.scene.each((go1) => {
           this.scene.each((go2) => {

                if(go1.id !== go2.id &&
                    (penetration = rectanglePenetration({
                        x: [go1.position.x, go1.position.x + go1.size.width],
                        y: [go1.position.y, go1.position.y + go1.size.height],
                    }, {
                        x: [go2.position.x, go2.position.x + go2.size.width],
                        y: [go2.position.y, go2.position.y + go2.size.height],
                    }))) 
                {
                    callback(go1, go2, {
                        penetration
                    });
                }
           });
        });
    }
} 