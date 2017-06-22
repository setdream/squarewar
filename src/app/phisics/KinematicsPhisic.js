export default class KinematicsPhisic {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.speed = 2;
        this.accelerate = 0.1;
    }

    calculate(dt) {
        this.gameObject.position.x += this.speed * dt;
        this.gameObject.position.y += this.speed * dt;

        this.speed += this.accelerate * this.speed;

        if (this.gameObject.position.x > 1000) {
            
        }
    }
}
