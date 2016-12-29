import {Validate} from '~/src/util/validate'
import {InstanceProperty} from '~/src/tickator/definition/instance_property'

export class Property {
  constructor(instanceProperty, parentProperties) {
    Validate.isA(instanceProperty, InstanceProperty)
    Validate.notNull(parentProperties)

    this._instanceProperty = instanceProperty

    this._value = this._instanceProperty.value()

    if (this._value instanceof Function) {
      Validate.isFunctionWithArity(this._value, 1)

      this._value = this._value(parentProperties)
    }
  }

  definition() {
    return this._instanceProperty.definition()
  }

  value() {
    return this._value
  }
}
