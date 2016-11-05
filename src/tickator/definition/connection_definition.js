export default class ConnectionDefinition {
  constructor(uuidVal, fromInstanceVal, fromOutputVal,
    toInstanceVal, toInputVal) {
    this.uuidVal = uuidVal
    this.fromInstanceVal = fromInstanceVal
    this.fromOutputVal = fromOutputVal
    this.toInstanceVal = toInstanceVal
    this.toInputVal = toInputVal
  }

  uuid() {
    return this.uuidVal
  }

  fromInstance() {
    return this.fromInstanceVal
  }

  fromOutput() {
    return this.fromOutputVal
  }

  toInstance() {
    return this.toInstanceVal
  }

  toInput() {
    return this.toInputVal
  }
}
