import {Tools} from '~/src/util/tools'
import {Validate} from '~/src/util/validate'
import {ConnectionDefinition} from './connection_definition'

export class ConnectionDefinitionBuilder {
  constructor(instances, inputs, outputs) {
    this._instances = instances
    this._inputs = inputs
    this._outputs = outputs
  }

  build() {
    if (this._fromInstance) {
      Validate.valid(this._instances[this._fromInstance]!==undefined,
        `Cannot find source instance '${this._fromInstance}'`)

      const objFrom = this._instances[this._fromInstance].definition()

      Validate.valid(objFrom.hasOutput(this._fromOutput),
        `Cannot find output ${this._fromOutput}`)
    } else {
      Validate.valid(this._inputs.some(i=>i.name()===this._fromOutput),
        `Cannot find output ${this._fromOutput}`)
    }

    if (this._toInstance) {
      Validate.valid(this._instances[this._toInstance]!==undefined,
        `Cannot find target instance '${this._toInstance}'`)

      const objTo = this._instances[this._toInstance].definition()

      Validate.valid(objTo.hasInput(this._toInput), `Cannot find input ${this._toInput}`)
    } else {
      Validate.valid(this._outputs.some(o=>o.name()===this._toInput),
      `Cannot find input ${this._toInput}`)
    }

    return new ConnectionDefinition(Tools.generateUUID(), this._fromInstance, this._fromOutput,
      this._toInstance, this._toInput)
  }

  fromInstance(name) {
    Validate.notBlank(name)
    this._fromInstance = name
  }

  fromThis() {
    this._fromInstance = null
  }

  fromOutput(name) {
    Validate.notBlank(name)
    this._fromOutput = name
  }

  toInstance(name) {
    Validate.notBlank(name)
    this._toInstance = name
  }

  toThis() {
    this._toInstance = null
  }

  toInput(name) {
    Validate.notBlank(name)
    this._toInput = name
  }
}
