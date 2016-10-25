import Validate from '../util/validate'
import InputDefinition from './input_definition'

export default class InputDefinitionBuilder {

  build() {
    return new InputDefinition(this.nameVal, this.validatorVal)
  }

  name(nameVal) {
    Validate.notBlank(nameVal)

    this.nameVal = nameVal
  }

  validate(validatorVal) {
    Validate.isFunctionWithArity(validatorVal, 1)

    this.validatorVal = validatorVal
  }
}
