import Composition from './Compositor.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './Math.js';
import { Dispatcher } from './Dispatcher.js';

export default class Level {

  constructor() {
    this.gravity = 20;
    this.totalTime = 0;

    this.comp = new Composition;
    this.entities = new Set;
    this.tiles = new Matrix;
    this.tileCollider = new TileCollider(this.tiles);

    let d = new Dispatcher();
    // d.on('targetHit', this.onLevelCompleted);
    // d.on('targetHit', this.onLevelCompleted);
    d.off('targetHit', function(){});
  }

  onLevelCompleted(){
    console.log('level completed!!');
  }

  // setupListener(){
  // listen to level complete events
  // }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      // Check if collided with edges
      // X
      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      // Y
      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.totalTime += deltaTime;
  }
}