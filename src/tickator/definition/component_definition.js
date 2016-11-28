export default class ComponentDefinition {
  constructor(name, instances, connections, properties, inputs, outputs) {
    this._name = name
    this._instances = instances
    this._connections = connections
    this._properties = properties
    this._inputs = inputs
    this._outputs = outputs
  }

  name() {
    return this._name
  }

  comment() {
    return 'todo'
  }

  inputs() {
    return this._inputs
  }

  outputs() {
    return this._outputs
  }

  properties() {
    return this._properties
  }

  instances() {
    return Object.keys(this._instances).map(k=>this._instances[k])
  }

  connections() {
    return Object.keys(this._connections).map(k=>this._connections[k])
  }

  toDebug() {
    return {
      name: this._name
    }
  }

  type() {
    return 'component'
  }

  hasProperty(name) {
      return this._properties.some(p=>p.name()==name)
  }

  hasInput(name) {
    return this._inputs.some(i=>i.name()==name)
  }

  hasOutput(name) {
    return this._outputs.some(o=>o.name()==name)
  }
}
