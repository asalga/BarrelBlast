import { Config } from './config.js';

export class Trait {
  constructor(name) {
    this.name = name;
    this.time = 0;
  }

  setup(){
    console.log('warning: trait setup not defined');
  }

  update(dt) {
    console.log('warning: trait update not defined');
  }
}