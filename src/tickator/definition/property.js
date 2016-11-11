export default class Property {
  constructor(definition, value) {
    this._definition = definition
    this._value = value
  }

  definition() {
    return this._definition;
  }

  value() {
    return this._value!==undefined ? this._value : this._definition.defaultValue();
  }
}
