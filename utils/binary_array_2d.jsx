import Point from "../geom/point"

export default class BinaryArray2D {
  constructor(size) {
    this._size = size

    const length = Math.ceil((this._size.width*this._size.height)/32.0)

    this._data = []

    for (let i=0;i<length;++i) {
      this._data.push(0)
    }
  }

  snapshot() {
    this._snapshot = this._data.slice()
  }

  restore() {
    this._data = this._snapshot
  }

  getWidth() {
    return this._size.width
  }

  getHeight() {
    return this._size.height
  }

  reset() {
    this._data.fill(0)
  }

  set(point) {
    if (!point instanceof Point) {
      throw `Expected point, got ${typeof point}`
    }

    this._checkCoords(point)

    const arrayIndex = this._calcArrayIndex(point);
    const bitIndex = this._calcBitIndex(point);

    this._data[arrayIndex] |= (1<<bitIndex)
  }

  get(point) {
    if (!point instanceof Point) {
      throw `Expected point, got ${typeof point}`
    }

    this._checkCoords(point)

    const arrayIndex = this._calcArrayIndex(point);
    const bitIndex = this._calcBitIndex(point);

    return (this._data[arrayIndex] & (1<<bitIndex)) ? true : false;
  }

  _calcArrayIndex(point) {
    return Math.floor((point.x+point.y*this._size.width)/32)
  }

  _calcBitIndex(point) {
    return Math.floor((point.x+point.y*this._size.width)%32)
  }

  _checkCoords(point) {
    if (point.x<0 || point.y<0 || point.x>=this._size.width || point.y>=this._size.height) {
      throw `Trying to access cell ${point.toString()} in bit array of size ${this._size.toString()}`;
    }
  }
}
