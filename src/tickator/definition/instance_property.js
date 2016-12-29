import {Validate} from '~/src/util/validate'
import {PropertyDefinition} from '~/src/tickator/definition/property_definition'

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
