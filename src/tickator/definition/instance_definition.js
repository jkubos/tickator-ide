
export default class InstanceDefinition {
  constructor (nameVal, tickletVal, componentVal, propertiesVal, xVal, yVal) {
    this.nameVal = nameVal
    this.tickletVal = tickletVal
    this.componentVal = componentVal
    this.propertiesVal = propertiesVal
    this.xVal = xVal
    this.yVal = yVal
  }

  name() {
    return this.nameVal
  }

  ticklet() {
    return this.tickletVal
  }

  component() {
    return this.componentVal
  }

  x() {
    return this.xVal
  }

  y() {
    return this.yVal
  }

  definition() {
    if (this.tickletVal) {
      return this.tickletVal
    } else if (this.componentVal) {
      return this.componentVal
    } else {
      throw `Unknown instance definition in ${this.toDebug()}`
    }
  }

  toDebug() {
    return {
      name: this.nameVal,
    }
  }

  properties() {
    return this.propertiesVal
  }
}
