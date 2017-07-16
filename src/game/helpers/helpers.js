export const getRequestAnimationFrame = function() {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}

export const makeTimer = lastTime => nowTime => (dt => (lastTime = nowTime) && dt)((nowTime - lastTime) / 1000.0);

export const rectangleIntersection = ({x: [x11, x12], y: [y11, y12]}, {x: [x21, x22], y: [y21, y22]}) => 
    (x12 - x11 + x22 - x21 - Math.abs(x12 + x11 - x22 - x21)) > 0 &&
        (y12 - y11 + y22 - y21 - Math.abs(y12 + y11 - y22 - y21)) > 0;

export const aabbCollision = ({position: {x: x1, y: y1}, size: {width: width1, height: height1}},
    {position: {x: x2, y: y2}, size: {width: width2, height: height2}}) => {
    
        if(x1 < x2 + width2 && x1 + width1 > x2 && y1 < y2 + height2 && y1 + height1 > y2) {
            const S1x = Math.abs(x1 - x2);
            const S2x = Math.abs((x1 + width1) - (x2 + width2));
            const Wx = width1 + width2;
            const SWx = S1x + S2x - Wx;

            const S1y = Math.abs(y1 - y2);
            const S2y = Math.abs((y1 + height1) - (y2 + height2));
            const Wy = height1 + height2;
            const SWy = S1y + S2y - Wy;

            //const SWx = Math.abs(Math.abs(x1 - x2) + Math.abs(x1 + width1 - x2 - width2) - width1 + width2);
            //const SWy = Math.abs(Math.abs(y1 - y2) + Math.abs(y1 + height1 - y2 - height2) - height1 + height2);

            console.log('SWx: ', SWx, ', SWy: ', SWy);
            return {
                direction1: {
                    x: x1 < x2 ? 1: -1,
                    y: y1 < y2 ? 1: -1
                },
                direction2: {
                    x: x1 > x2 ? 1: -1,
                    y: y1 > y2 ? 1: -1
                },
                x: Math.abs(SWx),
                y: Math.abs(SWy)
            };
        }


//     if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
  
// }
}

export const rectanglePenetration = ({x: [x11, x12], y: [y11, y12]}, {x: [x21, x22], y: [y21, y22]}) => {
    const dx = x12 + x11 - x22 - x21,
          dy = y12 + y11 - y22 - y21,
          x = (x12 - x11 + x22 - x21 - Math.abs(dx)) / 2,
          y = (y12 - y11 + y22 - y21 - Math.abs(dy)) / 2;

    if (x > 0 && y > 0) return {
        x: x,
        y: y,
        direction: {
            x: dx / Math.abs(dx),
            y: dy / Math.abs(dy)
        }
    };

    return null;
}

export const getRandomInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const toRadians = (degree) => degree * Math.PI / 180;