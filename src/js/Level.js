import { Matrix } from './Math.js';

export default class Level {
  constructor() {
    console.log('level created');

    this.entities = new Set;
    this.tiles = new Matrix;
  }
  update(dt) {

  }
}