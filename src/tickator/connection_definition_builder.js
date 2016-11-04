import {generateUUID} from '../util/tools'
import Validate from '../util/validate'
import ConnectionDefinition from './connection_definition'

export default class ConnectionDefinitionBuilder {
  constructor(instances) {
    this.instances = instances
  }

  build() {
    Validate.valid(this.instances[this.fromInstanceVal]!==undefined, `Cannot find source instance '${this.fromInstanceVal}'`)

    const objFrom = this.instances[this.fromInstanceVal].definition()

    Validate.valid(objFrom.hasOutput(this.fromOutputVal))

    Validate.valid(this.instances[this.toInstanceVal]!==undefined, `Cannot find target instance '${this.toInstanceVal}'`)

    const objTo = this.instances[this.toInstanceVal].definition()

    Validate.valid(objTo.hasInput(this.toInputVal))

    return new ConnectionDefinition(generateUUID(), this.fromInstanceVal, this.fromOutputVal,
      this.toInstanceVal, this.toInputVal)
  }

  fromInstance(name) {
    Validate.notBlank(name)
    this.fromInstanceVal = name
  }

  fromOutput(name) {
    Validate.notBlank(name)
    this.fromOutputVal = name
  }

  toInstance(name) {
    Validate.notBlank(name)
    this.toInstanceVal = name
  }

  toInput(name) {
    Validate.notBlank(name)
    this.toInputVal = name
  }
}
