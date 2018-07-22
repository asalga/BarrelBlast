import { Trait } from '../Trait.js';
import { Vec2D } from '../math.js';

export default class Fire extends Trait {
  constructor(cfg) {
    super('fire');
  }

  // gets called after trait's entity prop has been assigned
  setup() {
    // console.log('fire child setup');
    this.entity.hasBeenLaunched = false;
  }

  start() {
    this.entity.hasBeenLaunched = true;
    this.entity.vel.y = 400;
  }

  update(dt) {}

}