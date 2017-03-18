import {Validate} from '~/src/util/Validate'
import {PropertyDefinition} from '~/src/tickator/definition/PropertyDefinition'

export class InstanceProperty {
  constructor(definition, value) {
    Validate.isA(definition, PropertyDefinition)

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
