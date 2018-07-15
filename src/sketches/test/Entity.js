import {Vec2D} from './math.js';

export class Entity {
  constructor(cfg) {
    this.vel = cfg.vel || new Vec2D;
    this.pos = cfg.pos || new Vec2D;

    this.rot = 0;
    this.angVel = 0;
    this.barrel = null;
  }

  update(dt) {
  	if(this.vel){
  		let d = this.vel.mult(dt);
  		this.pos.add(d);
  	}
  }

  render(p) {}
}

export class User extends Entity {
	constructor(cfg){
		super(cfg);
		this.name = 'user';
		this.isMoving = false;
	}

  render(p) {
    p.push();
    p.noStroke();
    p.fill(0, 200, 0);
    // p.ellipse(this.pos.x, this.pos.y, 20, 20);
    p.rect(this.pos.x, this.pos.y, 20, 20);
    p.pop();
  }

  launch(){
  	if(this.isMoving){
  		return;
  	}
  	this.isMoving = true;

  	console.log('user.launch');
  	this.barrel.rot;
  	this.vel = new Vec2D(100,0);
  }
}

export class Barrel extends Entity {
	constructor(cfg){
		super(cfg);
		this.name = 'barrel';
	}

  render(p) {
    p.push();
    p.strokeWeight(2);
    p.stroke(0);
    p.fill(100);
    p.rect(this.pos.x, this.pos.y, 20, 20);
    p.pop();
  }

  insert(user) {
    this.user = user;
    user.barrel = this;
  }

}