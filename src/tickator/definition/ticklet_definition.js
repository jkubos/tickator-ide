export default class TickletDefinition {
  constructor(klass, name, comment, inputs, outputs, properties, autostart=false) {
    this._klass = klass
    this._name = name
    this._comment = comment
    this._inputs = inputs
    this._outputs = outputs
    this._properties = properties
    this._autostart = autostart
  }

  toDebug() {
    return {
        name: this._name,
        comment: this._comment,
        autostart: this._autostart,
        inputs: this._inputs.map(i=>i.toDebug()),
        outputs: this._outputs.map(o=>o.toDebug()),
        properties: this._properties.map(p=>p.toDebug())
    }
  }

  klass() {
      return this._klass
  }

  name() {
    return this._name
  }

  comment() {
    return this._comment
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

  autostart() {
    return this._autostart
  }

  type() {
    return 'ticklet'
  }

  hasInput(name) {
    return this._inputs.some(i=>i.name()==name)
  }

  hasOutput(name) {
    return this._outputs.some(o=>o.name()==name)
  }

  hasProperty(name) {
      return this._properties.some(p=>p.name()==name)
  }
}
