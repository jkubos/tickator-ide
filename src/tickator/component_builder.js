import Validate from '../util/validate'
import TickletRepository from './ticklet_repository'
import ComponentDefinition from './component_definition'

export default class ComponentBuilder {
  constructor(tickletRepository) {
    Validate.isA(tickletRepository, TickletRepository)

    this.tickletRepository = tickletRepository
  }

  build() {
    return new ComponentDefinition(this.nameVal)
  }

  name (nameVal) {
    Validate.notBlank(nameVal)
    this.nameVal = nameVal
  }

  instance (block) {

  }

  connect (refFrom, refTo) {

  }
}
