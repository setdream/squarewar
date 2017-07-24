import Victor from 'victor';
import Field from './collision/Field';

import TYPES from '../consts/physic.types';

import { rectanglePenetration, getRandomInterval } from '../helpers/helpers';


export default class CollisionPhysic {
    type = TYPES.COLLISION;

    constructor(scene) {
        this.scene = scene;
        this.field = new Field(scene);
    }

    getAxes({vertices: corners1}, {vertices: corners2}) {
        return [
            corners1[1].clone().subtract(corners1[0]).norm(),
            corners1[3].clone().subtract(corners1[0]).norm(),
            corners2[1].clone().subtract(corners2[0]).norm(),
            corners2[3].clone().subtract(corners2[0]).norm(),
        ];
    }

    collide(go1, go2) {
        const allCorners = [go1.vertices, go2.vertices];
        const axes = this.getAxes(go1, go2);
        const scalars = [];
        
        let overlap = Number.MAX_VALUE;
        
        let mtv = new Victor(Number.MAX_VALUE, Number.MAX_VALUE);
        
        for (let axis of axes) {
            allCorners.forEach((corners, index) => {
                scalars[index] = [];

                corners.forEach((point) => {
                    scalars[index].push(point.dot(axis));
                });

            });

            const s1max = Math.max.apply(null, scalars[0]),
                  s1min = Math.min.apply(null, scalars[0]),
                  s2max = Math.max.apply(null, scalars[1]),
                  s2min = Math.min.apply(null, scalars[1]);

            if (s2min > s1max || s2max < s1min) {
                return false;
            }
            
            overlap = s1max > s2max ? -(s2max - s1min) : (s1max - s2min);

            if (Math.abs(overlap) < mtv.length()) { 
                mtv = axis.clone().multiply(new Victor(overlap, overlap));
            }
        }

        return mtv;
    }

    calculate(callback = () => {}) {
        let penetration = null;

        this.field.init();

        this.scene.each((go1) => {
            if (!go1.isCollapsed) {
                return;
            }

           this.field.getCollapseIds(go1).forEach((id) => {
                const go2 = this.scene.find(id);

                if(go2 && go1.id !== id &&
                    (penetration = this.collide(go2, go1))) 
                {
                    callback(go1, go2, {
                        penetration
                    });
                }
           });
        });
    }
} 