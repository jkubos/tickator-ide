import Property from './property'

export default class InstanceDefinition {
  constructor (name, ticklet, component, propertiesVal, x, y) {
    this._name = name
    this._ticklet = ticklet
    this._component = component
    this._x = x
    this._y = y

    this._properties = this.target().properties().map(def=>{
      let value = propertiesVal[def.name()]
      return new Property(def, value)
    })
  }

  name() {
    return this._name
  }

  ticklet() {
    return this._ticklet
  }

  component() {
    return this._component
  }

  target() {
    return this._ticklet || this._component
  }

  x() {
    return this._x
  }

  y() {
    return this._y
  }

  definition() {
    if (this._ticklet) {
      return this._ticklet
    } else if (this._component) {
      return this._component
    } else {
      throw `Unknown instance definition in ${this.toDebug()}`
    }
  }

  toDebug() {
    return {
      name: this._name,
    }
  }

  properties() {
    return this._properties
  }
}
