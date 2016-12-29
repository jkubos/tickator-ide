import {Validate} from '~/src/util/validate'
import {Ticklet} from './ticklet'
import {InputDefinition} from '~/src/tickator/definition/input_definition'
import {Output} from './output'

export class Input {
  constructor(ticklet, definition) {
    Validate.isA(ticklet, Ticklet)
    Validate.isA(definition, InputDefinition)

    this._ticklet = ticklet
    this._definition = definition
    this._outputs = []
  }

  bind(output) {
    Validate.isA(output, Output)
    this._outputs.push(output)
  }

  ticklet() {
    return this._ticklet
  }

  get() {
    Validate.ofSize(this._outputs, 1, `Exactly one output expected, got ${this._outputs.length}`)
    return this._outputs[0].get()
  }

  isTriggering() {
    return this._outputs.some(output=>output.isTriggering())
  }
}
