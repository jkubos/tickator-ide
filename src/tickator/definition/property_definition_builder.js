import Validate from '~/src/util/validate'
import PropertyDefinition from './property_definition'

export default class PropertyDefinitionBuilder {

    build() {
      return new PropertyDefinition(this.nameVal)
    }

    name(nameVal) {
      Validate.notBlank(nameVal)

      this.nameVal = nameVal
    }

  }
