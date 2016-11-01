import Validate from '../util/validate'
import OutputDefinition from './output_definition'

export default class OutputDefinitionBuilder {

  constructor() {
    this.side = 'left'
    this.ratio = 0.5
  }

  build() {
    return new OutputDefinition(this.nameVal, this.validatorVal, this.side, this.ratio)
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
