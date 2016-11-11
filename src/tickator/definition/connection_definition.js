export default class ConnectionDefinition {
  constructor(uuid, fromInstance, fromOutput,
    toInstance, toInput) {
    this._uuid = uuid
    this._fromInstance = fromInstance
    this._fromOutput = fromOutput
    this._toInstance = toInstance
    this._toInput = toInput
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

  toDebug() {
    return {
      from: `${this._fromInstance} -> ${this._fromOutput}`,
      to: `${this._toInstance} -> ${this._toInput}`
    }
  }
}
