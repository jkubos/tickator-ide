import {Validate} from '~/src/util/validate'
import {TickletRepository} from './ticklet_repository'
import {ComponentRepository} from './component_repository'
import {InstanceDefinition} from './instance_definition'
import {TickletDefinition} from './ticklet_definition'
import {ComponentDefinition} from './component_definition'

export class InstanceDefinitionBuilder {
  constructor (tickletRepository, componentRepository) {
    Validate.isA(tickletRepository, TickletRepository)
    Validate.isA(componentRepository, ComponentRepository)

    this._tickletRepository = tickletRepository
    this._componentRepository = componentRepository
    this._properties = {}

    this._x = 100
    this._y = 100

    this._inputPosition = {}
    this._outputPosition = {}
  }

  build() {
    Validate.oneSet([this._ticklet, this._component], "Ticklet or component should be selected.")

    if (this._ticklet) {
      Validate.isA(this._ticklet, TickletDefinition)
    }

    if (this._component) {
      Validate.isA(this._component, ComponentDefinition)
    }

    Object.keys(this._inputPosition).forEach(name=>{
      Validate.valid((this._ticklet || this._component).hasInput(name), `Input ${name} does not exists on definition`)
    })

    Object.keys(this._outputPosition).forEach(name=>{
      Validate.valid((this._ticklet || this._component).hasOutput(name), `Output ${name} does not exists on definition`)
    })

    Object.keys(this._properties).forEach(propName=>{
      Validate.valid((this._ticklet || this._component).hasProperty(propName), `Property ${propName} does not exists`)
    })

    return new InstanceDefinition(this.nameVal, this._ticklet, this._component,
      this._properties, this._x, this._y, this._inputPosition, this._outputPosition)
  }

  name(nameVal) {
    Validate.notBlank(nameVal)
    this.nameVal = nameVal
  }

  ticklet(ticklet) {
    Validate.valid(this._tickletRepository.isDefined(ticklet), `Cannot find ticklet '${ticklet}'`)

    this._ticklet = this._tickletRepository.get(ticklet)
  }

  component(componentVal) {
    Validate.valid(this._componentRepository.isDefined(componentVal), `Cannot find component '${componentVal}'`)

    this._component = this._componentRepository.get(componentVal)
  }

  property(name, value) {
    Validate.isString(name)
    Validate.notBlank(name)
    Validate.notSet(this._properties, name)

    this._properties[name] = value
  }

  x(x) {
    Validate.isNumber(x)
    this._x = x
  }

  y(y) {
    Validate.isNumber(y)
    this._y = y
  }

  inputPosition(name, side, ratio) {
    Validate.notSet(this._inputPosition, name)
    Validate.oneOf(side, ['top', 'left', 'bottom', 'right'])
    Validate.numberInRangeIncl(ratio, 0.0, 1.0)

    this._inputPosition[name] = {side, ratio}
  }

  outputPosition(name, side, ratio) {
    Validate.notSet(this._outputPosition, name)
    Validate.oneOf(side, ['top', 'left', 'bottom', 'right'])
    Validate.numberInRangeIncl(ratio, 0.0, 1.0)

    this._outputPosition[name] = {side, ratio}
  }
}
