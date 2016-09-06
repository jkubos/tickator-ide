export default class Size {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  equals(other) {
    if (!other instanceof Size) {
      throw `Trying to compare Size and ${typeof other}`
    }

    return this.width==other.width && this.height==other.height
  }

  toString() {
    return `[${this.width}, ${this.height}]`
  }
}
