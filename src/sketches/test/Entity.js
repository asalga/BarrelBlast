import { Vec2D } from './math.js';

export class Entity {
  constructor(cfg) {
    this.vel = cfg.vel || new Vec2D;
    this.pos = cfg.pos || new Vec2D;

    this.rot = 0;
    this.angVel = 0;
    this.barrel = null;

    this.entities = new Set;
  }

  addChild(child) {
    this.entities.add(child);
  }

  removeChild(child) {
  	this.entities.delete(child);
  	return child;
  }

  update(dt) {
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
    this.entities.forEach( v=> v.render(p));
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

  launch() {
    if (this.isMoving) {
      return;
    }
    this.isMoving = true;

    console.log('user.launch', scene);
    this.vel = new Vec2D(100, 0);
  }
}

export class Barrel extends Entity {
  constructor(cfg) {
    super(cfg);
    this.name = 'barrel';
  }

  renderProxy(p) {
    p.translate(this.pos.x, this.pos.y);
    p.strokeWeight(1);
    p.stroke(0);
    p.noFill();
    p.rect(0, 0, 20, 20);
  }

  insert(user) {
    this.user = user;
    user.barrel = this;
  }

}