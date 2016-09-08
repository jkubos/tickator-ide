import Point from "./point"

export default class Line {
  constructor(from, to) {
    this.from = from;
    this.to = to;
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
}
