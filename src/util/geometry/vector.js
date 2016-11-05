export default class Vector {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  multiplied(length) {
    return new Vector(this.dx*length, this.dy*length)
  }

  toString() {
    return `[${this.dx}, ${this.dy}]`
  }
}
