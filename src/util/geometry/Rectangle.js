import {Size} from "./Size"
import {Vector} from "./Vector"
import {Point} from "./Point"
import {Line} from "./Line"

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

  get topLeft() {
    return new Point(this.x, this.y)
  }

  get topRight() {
    return new Point(this.x+this.width, this.y)
  }

  get bottomLeft() {
    return new Point(this.x, this.y+this.height)
  }

  get bottomRight() {
    return new Point(this.x+this.width, this.y+this.height)
  }

  findPosition(side, sideRatio) {
    Validate.oneOf(side, ['left', 'right', 'bottom', 'top'])
    Validate.numberInRangeIncl(sideRatio, 0, 1)

    if (side=='left') {
      return this.bottomLeft.added(new Vector(0, -sideRatio*this.height))
    } else if (side=='right') {
      return this.topRight.added(new Vector(0, sideRatio*this.height))
    } else if (side=='bottom') {
      return this.bottomRight.added(new Vector(-sideRatio*this.width, 0))
    } else if (side=='top') {
      return this.topLeft.added(new Vector(sideRatio*this.width, 0))
    } else {
      throw `Huh? ${side}`
    }
  }

  insideDirection(side) {
    Validate.oneOf(side, ['left', 'right', 'bottom', 'top'])

    if (side=='left') {
      return new Vector(1, 0)
    } else if (side=='right') {
      return new Vector(-1, 0)
    } else if (side=='bottom') {
      return new Vector(0, -1)
    } else if (side=='top') {
      return new Vector(0, 1)
    } else {
      throw `Huh? ${side}`
    }
  }

  findNearestPosition(point) {
    Validate.isA(point, Point)

    const sides = {
      left: new Line(this.bottomLeft, this.topLeft),
      right: new Line(this.topRight, this.bottomRight),
      bottom: new Line(this.bottomRight, this.bottomLeft),
      top: new Line(this.topLeft, this.topRight)
    }

    let minDistance = Number.MAX_SAFE_INTEGER
    let selectedSide = undefined
    let ratio = 0.5

    Object.keys(sides).forEach(side=>{
      const dist = sides[side].distanceTo(point)

      if (dist<minDistance) {
        minDistance = dist
        selectedSide = side
        ratio = sides[side].projectionRatio(point)
      }
    })

    return {side: selectedSide, ratio}
  }
}
