import { Vec2D } from './Math.js';

export default class Camera {
    constructor() {
        this.pos = new Vec2D(0, 0);
        this.size = new Vec2D(256, 224);
    }
}