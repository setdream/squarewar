import Victor from 'victor';
import TYPES from '../consts/physic.types';
import { rectanglePenetration, getRandomInterval } from '../helpers/helpers';


export default class CollisionPhysic {
    type = TYPES.COLLISION;

    constructor(scene) {
        this.scene = scene;
    }

    getAxis({vertices: corners1}, {vertices: corners2}) {
        return [
            corners1[1].clone().subtract(corners1[0]).norm(),
            corners1[3].clone().subtract(corners1[0]).norm(),
            corners2[1].clone().subtract(corners2[0]).norm(),
            corners2[3].clone().subtract(corners2[0]).norm(),
        ];
    }

    satCollide(go1, go2) {
        const allCorners = [go1.vertices, go2.vertices];
        const axis = this.getAxis(go1, go2);
        const scalars = [];
        let mtv = new Victor(Number.MAX_VALUE, Number.MAX_VALUE);
        
        for (let ax of axis) {
            allCorners.forEach((corners, index) => {
                scalars[index] = [];

                corners.forEach((point) => {
                    scalars[index].push(point.dot(ax));
                });

            });

            const s1max = Math.max.apply(null, scalars[0]),
                  s1min = Math.min.apply(null, scalars[0]),
                  s2max = Math.max.apply(null, scalars[1]),
                  s2min = Math.min.apply(null, scalars[1]);

            if (s2min > s1max || s2max < s1min) {
                return false;
            }
            
            let overlap = s1max > s2max ? -(s2max - s1min) : (s1max - s2min);

            if (Math.abs(overlap) < mtv.length()) { 
                mtv = ax.clone().multiply(new Victor(overlap, overlap));
            }
        }

        return mtv;
    }

    collide(go1, go2) {
        let overlap = Number.MAX_VALUE;
        let smallest = null;
        const axes1 = go1.getAxes();
        const axes2 = go2.getAxes();

        // loop over the axes1
        for (let i = 0; i < axes1.length; i++) {
            let axis = axes1[i];
            // project both shapes onto the axis
            let interval1 = go1.project(axis);
            let interval2 = go2.project(axis);
            // do the projections overlap?
            if (!interval1.isOverlap(interval2)) {
                // then we can guarantee that the shapes do not overlap
                return false;
            } else {
                let o = interval1.getOverlap(interval2);

                if (o < overlap) {
                    overlap = o;
                    smallest = axis;
                }
            }
        }

        // loop over the axes2
        for (let i = 0; i < axes2.length; i++) {
            let axis = axes2[i];
            // project both shapes onto the axis
            let interval1 = go1.project(axis);
            let interval2 = go2.project(axis);
            // do the projections overlap?
            if (!interval1.isOverlap(interval2)) {
                // then we can guarantee that the shapes do not overlap
                return false;
            } else {
                let o = interval1.getOverlap(interval2);

                if (o < overlap) {
                    overlap = o;
                    smallest = axis;
                }
            }
        }
        
        return smallest ? smallest.clone().multiply(new Victor(overlap, overlap)) : new Victor(0, 0);
    }

    calculate(callback = () => {}) {
        let penetration = null;

        this.scene.each((go1) => {
           this.scene.each((go2) => {
                
                if(go1.id !== go2.id &&
                    (penetration = this.satCollide(go2, go1))) 
                {
                    callback(go1, go2, {
                        penetration
                    });
                }
           });
        });
    }
} 