import Validate from '../util/validate'
import OutputDefinition from './output_definition'

export default class OutputDefinitionBuilder {

    build() {
      return new OutputDefinition(this.nameVal, this.validatorVal)
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
