export default class ComponentDefinition {
  constructor(nameVal, instancesVal, connectionsVal) {
    this.nameVal = nameVal
    this.instancesVal = instancesVal
    this.connectionsVal = connectionsVal
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

  connections() {
    return Object.keys(this.connectionsVal).map(k=>this.connectionsVal[k])
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
