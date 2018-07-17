import { Trait } from '../Trait.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.direction = 0;
        this.accel = 400;
        this.decel = 300;
        this.dragFactor = 1 / 2000;
        this.distance = 0;
        this.heading = 1;
    }

    update(deltaTime, entity) {
        const vel = entity.vel;
        const absX = Math.abs(vel.x);

        if (this.direction !== 0) {
            vel.x += this.accel * deltaTime * this.direction;
            this.heading = this.direction;
            
        }
        // we don't want to slide too long after we 
        // release the key, so decelerate fast.
        else if (vel.x !== 0) {
            // !!
            const d = (vel.x > 0 ? -1 : 1) * Math.min(absX, this.decel * deltaTime);
            // console.log(absX, this.decel* deltaTime, d);
            vel.x += d;
        }
        // stopped
        else {
            this.distance = 0;
        }

        let drag = this.dragFactor * vel.x * absX;
        vel.x -= drag;

        // !!
        this.distance += absX * deltaTime;
    }
}