import {InstanceProperty} from './InstanceProperty'

export class InstanceDefinition {
  constructor (name, ticklet, component, propertiesVal, x, y, inputPosition, outputPosition) {
    this._name = name
    this._ticklet = ticklet
    this._component = component
    this._x = x
    this._y = y
    this._inputPosition = inputPosition
    this._outputPosition = outputPosition

    this._properties = this.target().properties().map(def=>{
      let value = propertiesVal[def.name()]
      return new InstanceProperty(def, value)
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

  inputSide(name) {
    if (this._inputPosition[name]) {
      return this._inputPosition[name].side
    } else {
      return this.target().input(name).side()
    }
  }

  inputRatio(name) {
    if (this._inputPosition[name]) {
      return this._inputPosition[name].ratio
    } else {
      return this.target().input(name).ratio()
    }
  }

  outputSide(name) {
    if (this._outputPosition[name]) {
      return this._outputPosition[name].side
    } else {
      return this.target().output(name).side()
    }
  }

  outputRatio(name) {
    if (this._outputPosition[name]) {
      return this._outputPosition[name].ratio
    } else {
      return this.target().output(name).ratio()
    }
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
