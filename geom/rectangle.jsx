import Size from "./size"

export default class Rectangle {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  size() {
    return new Size(this.width, this.height)
  }

  contains(point) {
    if (point.x>=this.x) {
      if (point.y>=this.y) {
        if (point.x<=this.x+this.width) {
          if (point.y<=this.y+this.height) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
