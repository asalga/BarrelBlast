export class Vec2D {
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  mult(s) {
    return new Vec2D(this.x * s, this.y * s);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  copy() {
    return new Vec2D(this.x, this.y);
  }

  dot(v) {
    this.x * v.x + this.y * v.y;
  }

  length() {
    return sqrt(dot(this));
  }

  rot(r) {
    this.x *= cos(r);
    this.y *= sin(r);
  }
}

export class Matrix {

}