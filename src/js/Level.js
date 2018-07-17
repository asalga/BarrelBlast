import Composition from './Compositor.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './Math.js';

export default class Level {

  constructor() {
    this.gravity = 2000;
    this.totalTime = 0;

    this.comp = new Composition;
    this.entities = new Set;
    this.tiles = new Matrix;
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      // Check if collided with edges
      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);
      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);
      entity.vel.y += this.gravity * deltaTime;

    });

    this.totalTime += deltaTime;
  }
}