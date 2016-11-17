export default class PropertyDefinition {
  constructor(name, defaultValue) {
    this._name = name
    this._defaultValue = defaultValue
  }

  name() {
    return this._name
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
