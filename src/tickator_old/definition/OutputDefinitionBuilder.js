import {Validate} from '~/src/util/Validate'
import {OutputDefinition} from './OutputDefinition'

export class OutputDefinitionBuilder {

  constructor() {
    this.side = 'left'
    this.ratio = 0.5
    this._defaultValue = undefined
  }

  build() {
    return new OutputDefinition(this.nameVal, this.validatorVal, this.side, this.ratio, this._defaultValue)
  }

  name(nameVal) {
    Validate.notBlank(nameVal)

    this.nameVal = nameVal
  }

  validate(validatorVal) {
    Validate.isFunctionWithArity(validatorVal, 1)

    this.validatorVal = validatorVal
  }

  position(side, ratio) {
    Validate.oneOf(side, ['top', 'left', 'bottom', 'right'])
    Validate.numberInRangeIncl(ratio, 0.0, 1.0)

    this.side = side
    this.ratio = ratio
  }

  defaultValue(defaultValue) {
    this._defaultValue = defaultValue
  }
}
