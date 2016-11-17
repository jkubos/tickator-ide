import Validate from '~/src/util/validate'
import InstanceProperty from '~/src/tickator/definition/instance_property'

export default class Property {
  constructor(instanceProperty) {
    Validate.isA(instanceProperty, InstanceProperty)

    this._instanceProperty = instanceProperty
  }

  definition() {
    return this._instanceProperty.definition()
  }

  value() {
    return this._instanceProperty.value()
  }
}
