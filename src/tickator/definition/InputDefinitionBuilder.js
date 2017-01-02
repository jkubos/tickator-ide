import {Validate} from '~/src/util/Validate'
import {InputDefinition} from './InputDefinition'

export class InputDefinitionBuilder {

  constructor() {
    this.side = 'left'
    this.ratio = 0.5
  }

  build() {
    return new InputDefinition(this.nameVal, this.validatorVal, this.side, this.ratio)
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
}
