import { rectanglePenetration, aabbCollision, getRandomInterval } from '../helpers/helpers';

export default class CollisionPhysic {
    constructor(gameObjects) {
        this.gameObjects = gameObjects;
    }

    calculate(callback = () => {}) {
        const gObjects = this.gameObjects;
        const collapsed = [];
        let penetration = null;

        gObjects.forEach(({position: {x: x1, y: y1}, size: {width: w1, height: h1}, id: id1}) => {
           gObjects.forEach(({position: {x: x2, y: y2}, size: {width: w2, height: h2}, id: id2}) => {

                if(id1 !== id2 &&
                    (penetration = rectanglePenetration({
                        x: [x1, x1 + w1],
                        y: [y1, y1 + h1]
                    }, {
                        x: [x2, x2 + w2],
                        y: [y2, y2 + h2]
                    }))) 
                {
                    collapsed.push(id1, id2);

                    callback(id1, id2, {
                        penetration
                    });
                }
           });
        });
        // gObjects.forEach((go1) => {
        //    gObjects.forEach((go2) => {

        //         if(go1.id !== go2.id &&
        //             (penetration = aabbCollision(go1, go2))
        //         )
        //         {


        //             callback(go1.id, go2.id, {
        //                 angle: getRandomInterval(120, 240),
        //                 penetration
        //             });
        //         }
        //    });
        // });

    }
} 