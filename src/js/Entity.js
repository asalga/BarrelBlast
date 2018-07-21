import { Vec2D } from './math.js';

import { Config } from './config.js';
import { createAnim } from './anim.js';
import { loadSpriteSheet } from './loaders.js';

// traits
import Fire from './traits/Fire.js';
import SideToSide from './traits/SideToSide.js';
// import { TraitUpDown } from './Trait.js';


export class Entity {
  constructor(cfg) {
    this.vel = new Vec2D;
    this.pos = new Vec2D;

    if (cfg) {
      this.vel = cfg.vel; // || new Vec2D;
      this.pos = cfg.pos; // || new Vec2D
    }

    this.size = new Vec2D;
    this.frozen = true;

    this.rot = 0;
    this.angVel = 0;
    this.barrel = null;

    this.entities = new Set;
    this.traits = new Set;

    this.bounds;
  }

  addChild(c) {
    this.entities.add(c);
    c.parent = this;
  }

  addTrait(t) {
    this.traits.add(t);
    t.entity = this;
    t.setup();
    this[t.name] = t;
  }

  removeChild(c) {
    this.entities.delete(c);
    return c;
  }

  update(dt) {

    this.updateProxy && this.updateProxy(dt);

    this.traits.forEach(v => {
      v.update(dt, this);
    });

    if (this.vel) {
      let d = this.vel.mult(dt);
      this.pos.add(d);
    }
  }

  render(p) {
    p.push();
    this.renderProxy(p);
    this.renderChildren(p);
    p.pop();
  }

  renderChildren(p) {
    this.entities.forEach(v => v.render(p));
  }
}

export class User extends Entity {
  constructor(cfg) {
    super(cfg);
    this.name = 'user';
    this.isMoving = false;
  }

  renderProxy(p) {
    p.translate(this.pos.x, this.pos.y);
    p.noStroke();
    p.fill(0, 200, 0);
    p.ellipse(0, 0, 20, 20);
    // p.rect(this.pos.x, this.pos.y, 20, 20);
  }

  updateProxy(dt) {

    // TODO: fire event

    if (this.isMoving) {
      if (this.pos.x < 0 || this.pos.x > Config.GameWidth ||
        this.pos.y < 0 || this.pos.y > Config.GameHeight) {
        window.game.reset();
      }
    }

  }

  launch() {
    debugger;
    if (this.isMoving) {
      return;
    }
    console.log('user.launch', window.game.scene);

    this.isMoving = true;
    this.frozen = false;

    let parent = this.parent;
    parent.removeChild(this);
    window.game.scene.add(this);
    this.pos = parent.pos.copy();
    this.vel = new Vec2D(500, 0);
  }
}

export class Barrel extends Entity {
  constructor(cfg) {
    super(cfg);
    this.name = 'barrel';
  }

  renderProxy(p) {
    p.translate(this.pos.x, this.pos.y);
    p.strokeWeight(2);
    p.stroke(0);
    p.noFill();
    p.rect(0, 0, 50, 50);
  }
}

export function createUser() {
  console.log('createUser');

  return loadSpriteSheet('User')
    .then(sprite => {

      let user = new Entity;
      user.size.set(16, 16);

      user.addTrait(new Fire);
      user.addTrait(new SideToSide);

      user.frozen = true;

      let resolveAnim = createAnim([1, 2, 3].map(v => 'run-' + v), 10);

      function routeFrame(user) {
        // if (user.go.distance > 0) {
          // return resolveAnim(user.go.distance);
        // }
        return 'idle';
      }

      user.draw = function(context) {
        // sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
        sprite.draw(routeFrame(this), context, 0, 0, 0);
      };

      return user;
    });
}