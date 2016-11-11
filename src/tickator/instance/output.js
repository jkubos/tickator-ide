import Validate from '~/src/util/validate'
import Ticklet from './ticklet'
import OutputDefinition from '~/src/tickator/definition/output_definition'

export default class Output {

  constructor(ticklet, definition) {
    Validate.isA(ticklet, Ticklet)
    Validate.isA(definition, OutputDefinition)

    this._ticklet = ticklet
    this._definition = definition

    this._value = [definition.defaultValue(), null]
    this._validFrom = [-1, -2]
  }

  set(value) {
    if (value!==this.get()) {
      const upcomingIndex = this.getUpcomingIndex()
      const currentTick = this._ticklet.dispatcher().currentTick();

      this._value[upcomingIndex] = value
      this._validFrom[upcomingIndex] = currentTick+1
    }
  }

  get() {
    return this._value[this.getCurrentIndex()]
  }

  getCurrentIndex() {
    const currentTick = this._ticklet.dispatcher().currentTick();
    if (this._validFrom[0] > this._validFrom[1] || this._validFrom[1]>currentTick) {
      return 0
    } else {
      return 1
    }
  }

  getUpcomingIndex() {
    return (this.getCurrentIndex()+1)%2
  }
}
