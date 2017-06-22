export const getRequestAnimationFrame = function() {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
}

export const makeTimer = lastTime => nowTime => (dt => (lastTime = nowTime) && dt)((nowTime - lastTime) / 1000.0);
