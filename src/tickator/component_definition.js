export default class ComponentDefinition {
  constructor(nameVal, instancesVal) {
    this.nameVal = nameVal
    this.instancesVal = instancesVal
  }

  name() {
    return this.nameVal
  }

  comment() {
    return 'todo'
  }

  inputs() {
    return []
  }

  outputs() {
    return []
  }

  properties() {
    return []
  }

  instances() {
    return Object.keys(this.instancesVal).map(k=>this.instancesVal[k])
  }

  toDebug() {
    return {
      name: this.nameVal
    }
  }

  type() {
    return 'component'
  }
}
