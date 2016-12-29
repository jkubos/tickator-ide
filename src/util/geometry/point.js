export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  added(vect) {
    return new Point(this.x+vect.dx, this.y+vect.dy)
  }

  equals(other) {
    if (!other instanceof Point) {
      throw `Trying to compare point and ${typeof other}`
    }

    return this.x==other.x && this.y==other.y
  }

  toString() {
    return `[${this.x}, ${this.y}]`
  }

  distanceTo(other) {
    if (!other instanceof Point) {
      throw `Trying to get distance between point and ${typeof other}`
    }

    return Math.sqrt(Math.pow(this.x-other.x, 2)+Math.pow(this.y-other.y, 2))
  }
}
