import Validate from '../util/validate'
import TickletRepository from './ticklet_repository'
import ComponentRepository from './component_repository'
import InstanceDefinition from './instance_definition'
import TickletDefinition from './ticklet_definition'
import ComponentDefinition from './component_definition'

export default class InstanceDefinitionBuilder {
  constructor (tickletRepository, componentRepository) {
    Validate.isA(tickletRepository, TickletRepository)
    Validate.isA(componentRepository, ComponentRepository)

    this.tickletRepository = tickletRepository
    this.componentRepository = componentRepository
    this.properties = {}

    this.xVal = 100
    this.yVal = 100
  }

  build() {
    Validate.oneSet([this.tickletVal, this.componentVal], "Ticklet or component should be selected.")

    if (this.tickletVal) {
      Validate.isA(this.tickletVal, TickletDefinition)
    }

    if (this.componentVal) {
      Validate.isA(this.componentVal, ComponentDefinition)
    }

    return new InstanceDefinition(this.nameVal, this.tickletVal, this.componentVal,
      this.properties, this.xVal, this.yVal)
  }

  name(nameVal) {
    Validate.notBlank(nameVal)
    this.nameVal = nameVal
  }

  ticklet(tickletVal) {
    Validate.valid(this.tickletRepository.isDefined(tickletVal), `Cannot find ticklet '${tickletVal}'`)

    this.tickletVal = this.tickletRepository.get(tickletVal)
  }

  component(componentVal) {
    Validate.valid(this.componentRepository.isDefined(componentVal), `Cannot find component '${componentVal}'`)

    this.componentVal = this.componentRepository.get(tickletVal)
  }

  property(name, value) {
    Validate.isString(name)
    Validate.notBlank(name)
    Validate.notSet(this.properties, name)

    this.properties[name] = value
  }

  x(xVal) {
    Validate.isNumber(xVal)
    this.xVal = xVal
  }

  y(yVal) {
    Validate.isNumber(yVal)
    this.yVal = yVal
  }
}
