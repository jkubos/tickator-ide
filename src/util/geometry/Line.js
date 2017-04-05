import {Point} from "./Point"

export class Line {

  static dotProduct(p1, p2) {
    return p1.x*p2.x+p1.y*p2.y
  }

  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  length() {
    return Math.sqrt(Math.pow(this.from.x-this.to.x, 2) + Math.pow(this.from.y-this.to.y, 2))
  }

  distanceTo(point) {
    if (!point instanceof Point) {
      throw `Trying to get distance between line and ${typeof other}`
    }

    const px = this.to.x-this.from.x
    const py = this.to.y-this.from.y

    const something = 1.0*(px*px + py*py)

    let u = ((point.x - this.from.x) * px + (point.y - this.from.y) * py) / something

    if (u > 1) {
      u = 1
    } else if (u < 0) {
      u = 0
    }

    const x = this.from.x + u * px
    const y = this.from.y + u * py

    const dx = x - point.x
    const dy = y - point.y

    const dist = Math.sqrt(dx*dx + dy*dy)

    return dist
  }

  projectionRatio(point) {
    if (!point instanceof Point) {
      throw `Trying to get distance between line and ${typeof other}`
    }

    const e1 = new Point(this.to.x-this.from.x, this.to.y-this.from.y)
    const e2 = new Point(point.x-this.from.x, point.y-this.from.y)

    const valDp = Line.dotProduct(e1, e2)

    const len2 = Math.pow(e1.x, 2)+Math.pow(e1.y, 2)

    const p = new Point(this.from.x+(valDp*e1.x)/len2, this.from.y+(valDp*e1.y)/len2)

    return (new Line(this.from, p).length())/this.length()
  }
}
