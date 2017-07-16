import Rectangle from './Rectangle';
import GAME_OBJECT_TYPES from './../consts/game-object.types';

import { getRandomInterval } from '../helpers/helpers';

const DEFAULT_SQUARE_SPEED = 0;

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

export default class Square extends Rectangle {
    constructor(position, size, opt = {}) {
        super(position, size, size, opt);

        this.isCollapsed = true;
        this.type = GAME_OBJECT_TYPES.SQUARE;
    }

    collision(collisionObj, opt = {}) {
        const kinematic = this.physics.get('kinematic');
        
        const {x, y} = opt.penetration;

        let xPre = opt.penetration.x * opt.direction.x;
        let yPre = opt.penetration.y * opt.direction.y;

        if (collisionObj.isCollapsed) {
            xPre /= 2;
            yPre /= 2;
        } 

        if (opt.penetration.x < opt.penetration.y) {
            this.position.add([xPre, 0]);
        } else {
            this.position.add([0, yPre]);
        }

        kinematic.direction = (getRandomInterval(kinematic.direction + 91, kinematic.direction + 269)) % 360;
        
    }
}