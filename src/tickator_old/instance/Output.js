import {Validate} from '~/src/util/Validate'
import {Ticklet} from './Ticklet'
import {OutputDefinition} from '~/src/tickator/definition/OutputDefinition'
import {Input} from './Input'

export class Output {

  constructor(ticklet, definition) {
    Validate.isA(ticklet, Ticklet)
    Validate.isA(definition, OutputDefinition)

    this._ticklet = ticklet
    this._definition = definition

    this._value = [definition.defaultValue(), null]
    this._validFrom = [-1, -2]

    this._depending = []
    this._probes = []
  }

  addProbe(name) {
    Validate.notBlank(name)

    if (!this._probes.includes(name)) {
      this._probes.push(name)
    }
  }

  set(value) {
    //if (value!==this.get()) {
      const upcomingIndex = this._getUpcomingIndex()
      const currentTick = this._ticklet.dispatcher().currentTick();

      this._value[upcomingIndex] = value
      this._validFrom[upcomingIndex] = currentTick+1

      this._probes.forEach(probe=>this._ticklet.dispatcher().getPlatformApi().probeChange(probe, this.get(), value))

      this._ticklet.dispatcher().markChangedOutput(this)
    //}
  }

  get() {
    return this._value[this._getCurrentIndex()]
  }

  isTriggering() {
    return this._validFrom[this._getCurrentIndex()]==this._ticklet.dispatcher().currentTick()
  }

  _getCurrentIndex() {
    const currentTick = this._ticklet.dispatcher().currentTick();

    if (this._validFrom[0]>currentTick) {
      return 1
    } else if (this._validFrom[1]>currentTick) {
      return 0
    } else if (this._validFrom[0] > this._validFrom[1]) {
      return 0
    } else {
      return 1
    }
  }

  _getUpcomingIndex() {
    return (this._getCurrentIndex()+1)%2
  }

  depending() {
    return this._depending
  }

  addDepending(depending) {
    Validate.isA(depending, Input)

    this._depending.push(depending)
  }
}
