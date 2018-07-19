import TileResolver from './TileResolver.js';
import { Dispatcher } from './Dispatcher.js';

export default class TileCollider {
  constructor(matrix) {
    this.resolver = new TileResolver(matrix, 16);
  }

  checkX(entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.size.x;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else { return };

    const matches = this.resolver.searchByRange(
      x, x,
      entity.pos.y, entity.pos.y + entity.size.y);

    matches.forEach(m => {
      if (m.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {

        if (entity.pos.x + entity.size.x > m.x1) {
          entity.pos.x = m.x1 - entity.size.x;
          entity.vel.x = 0;
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < m.x2) {
          entity.pos.x = m.x2;
          entity.vel.x = 0;
        }
      }
    });
  }

  checkY(entity) {
    let y;

    // falling
    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.size.y;
    }
    // going up
    else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }

    // const match = this.resolver.searchByPosition(entity.pos.x, entity.pos.y);
    const matches = this.resolver.searchByRange(
      entity.pos.x, entity.pos.x + entity.size.x,
      y, y);

    matches.forEach(m => {

      // We hit the target
      if (m.tile.type === 'target') {
        var e = { evtName: "targetHit", src: this };
        let d = new Dispatcher();
        d.fire(e);
      }

      // Not Ground
      if (m.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > m.y1) {
          entity.pos.y = m.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < m.y2) {
          entity.pos.y = m.y2;
          entity.vel.y = 0;
        }
      }
    });
  }
}