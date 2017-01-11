import {Validate} from '~/src/util/Validate'

export class ConnectionDefinition {
  constructor(uuid, fromInstance, fromOutput,
    toInstance, toInput, probe) {
    this._uuid = uuid
    this._fromInstance = fromInstance
    this._fromOutput = fromOutput
    this._toInstance = toInstance
    this._toInput = toInput
    this._probe = probe
  }

  uuid() {
    return this._uuid
  }

  fromInstance() {
    return this._fromInstance
  }

  fromOutput() {
    return this._fromOutput
  }

  toInstance() {
    return this._toInstance
  }

  toInput() {
    return this._toInput
  }

  hasProbe() {
    return this._probe!==undefined
  }

  probeName() {
    Validate.valid(this.hasProbe())
    return this._probe
  }

  toDebug() {
    return {
      from: `${this._fromInstance} -> ${this._fromOutput}`,
      to: `${this._toInstance} -> ${this._toInput}`
    }
  }
}
