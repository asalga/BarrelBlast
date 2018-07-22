import Composition from './Compositor.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './Math.js';
import { Dispatcher } from './Dispatcher.js';

export default class Level {

  constructor() {
    this.gravity = 200;
    this.totalTime = 0;

    this.comp = new Composition;
    this.entities = new Set;
    this.tiles = new Matrix;
    this.tileCollider = new TileCollider(this.tiles);
    this.nextLevelRequested = false;
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      // Check if collided with edges
      // X

      this.tileCollider.checkX(entity);
      this.tileCollider.checkY(entity);

      // For now we have no other sprites, so we 
      // can ignore this...
      // if (!entity.frozen) {
      //   entity.pos.x += entity.vel.x * deltaTime;
      //   this.tileCollider.checkX(entity);

      //   // Y
      //   entity.pos.y += entity.vel.y * deltaTime;
      //   this.tileCollider.checkY(entity);

      //   entity.vel.y += this.gravity * deltaTime;
      // }
    });

    this.totalTime += deltaTime;
  }
}