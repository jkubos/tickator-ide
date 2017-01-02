import {Size} from "./Size"
import {Validate} from '~/src/util/Validate'

export class Rectangle {
  constructor(x, y, width, height) {
    Validate.isNumber(x)
    Validate.isNumber(y)
    Validate.isGreaterThanZero(width)
    Validate.isGreaterThanZero(height)

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
