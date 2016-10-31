
export default class InstanceDefinition {
  constructor (nameVal, tickletVal, componentVal, propertiesVal) {
    this.nameVal = nameVal
    this.tickletVal = tickletVal
    this.componentVal = componentVal
    this.propertiesVal = propertiesVal
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
