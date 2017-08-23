import CONSTS from '../consts/common';


const DEGREES = 180 / Math.PI;
const SLOW_TIME = .06;

export const getRequestAnimationFrame = function() {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}

export const makeTimer = 
    lastTime => nowTime => (dt => (lastTime = nowTime) && dt)(Math.min(SLOW_TIME, (nowTime - lastTime) / 1000.0));

export const toRadians = 
    (degree) => degree * Math.PI / CONSTS.ANGLE.HALF;

export const toDegrees = 
    (radians) => radians * DEGREES;

export const getRandomInterval = (min, max) => 
    Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomAngle = () =>
    getRandomInterval(0, CONSTS.ANGLE.FULL);

export const getRandomShockAngle = degree =>
    (degree + (Math.random() > .5 ? CONSTS.SQUARE.SHOCK_ANGLE : -CONSTS.SQUARE.SHOCK_ANGLE)) % CONSTS.ANGLE.FULL;

export const getRotateDirection = (angle, rotate) =>
    Math.abs(angle - rotate) > CONSTS.ANGLE.HALF ? -1 : 1;

export const getRandomSpeed = () =>
    getRandomInterval(CONSTS.SQUARE.MIN_SPEED, CONSTS.SQUARE.MAX_SPEED);

export const getRandomObjectDirection = () => 
    getRandomInterval(0, 8) * CONSTS.SQUARE.SHOCK_ANGLE;