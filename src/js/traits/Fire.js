import { Trait } from '../Trait.js';
import { Vec2D } from '../math.js';

export default class Fire extends Trait {
  constructor() {
    console.log('fire');
    super('fire');
    this.started = false;
  }

  start() {
    this.started = true;
    this.entity.vel.y = 100.;
  }

  update(dt) {}

}