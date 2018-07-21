import { Trait } from '../Trait.js';
import { Vec2D } from '../math.js';

export default class SideToSide extends Trait {
  constructor() {
    super('side to side');
    // d.on('targetHit', loadNextLevel);    

    this.bounds = {
      left: 16,
      right: 100
    };
    this.vel = 32.;
  }

  update(dt) {
    if(this.entity.hasBeenLaunched){
      return;
    }

    let pos = this.entity.pos;

    pos.x -= this.vel * dt;

    if(pos.x <= this.bounds.left){
      pos.x = this.bounds.left;
      this.vel = -this.vel;
    }
    if(pos.x >= this.bounds.right){
      pos.x = this.bounds.right;
      this.vel = -this.vel;
    }
  }
}