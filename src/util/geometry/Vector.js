export class Vector {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  multiplied(length) {
    return new Vector(this.dx*length, this.dy*length)
  }

  length() {
    return Math.sqrt(this.dx*this.dx+this.dy*this.dy)
  }

  perpendAntiClockwise() {
    return new Vector(-this.dy, this.dx)
  }

  perpendClockwise() {
    return new Vector(this.dy, -this.dx)
  }

  inverted() {
    return this.multiplied(-1)
  }

  unit() {
    return this.multiplied(1.0/this.length())
  }

  toString() {
    return `[${this.dx}, ${this.dy}]`
  }

  angle() {
    return Math.atan2(this.dy, this.dx)
  }

  angleDeg() {
    return this.angle()*(180.0/Math.PI)
  }
}
