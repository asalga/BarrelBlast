import { Config } from './config.js';

export class Trait {
  constructor(name) {
    this.name = name;
    this.entity;
    this.time = 0;
  }
  setEntity(e) {
    this.entity = e;
  }
  update(dt) {
    console.log('warning: trait update not defined');
  }
}

export class TraitUpDown extends Trait {
  constructor() {
    super('TraitUpDown');
  }

  update(dt) {
    this.time += dt;

    // TODO: fix
    // let y = (Math.sin(this.time) + 1) / 2 * (Config.GameHeight - 50) + 25;
    // this.entity.pos.y = y;
    
    // console.log(this.entity.pos);
  }
}