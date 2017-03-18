import {Validate} from '~/src/util/Validate'
import {PropertyDefinition} from './PropertyDefinition'

export class PropertyDefinitionBuilder {

    build() {
      return new PropertyDefinition(this._name, this._defaultValue)
    }

    name(nameVal) {
      Validate.notBlank(nameVal)

      this._name = nameVal
    }

    defaultValue(defaultValueVal) {
      this._defaultValue = defaultValueVal
    }

  }
