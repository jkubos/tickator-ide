export default class OutputDefinition {
  constructor(name, validator, side, ratio, defaultValue) {
    this._name = name
    this._validator = validator
    this._side = side
    this._ratio = ratio
    this._defaultValue = defaultValue
  }

  name() {
    return this._name
  }

  validator() {
    return this._validator
  }

  side() {
    return this._side
  }

  ratio() {
    return this._ratio
  }

  defaultValue() {
    return this._defaultValue
  }

  toDebug() {
    return {
      name: this._name
    }
  }
}
