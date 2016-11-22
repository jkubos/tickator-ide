import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import TickletDefinition from '~/src/tickator/definition/ticklet_definition'
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import Input from './input'
import Output from './output'
import Property from './property'

export default class Ticklet {

  constructor(dispatcher, instanceDefinition) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(instanceDefinition, InstanceDefinition)
    Validate.isA(instanceDefinition.ticklet(), TickletDefinition)

    this._dispatcher = dispatcher
    this._instanceDefinition = instanceDefinition

    this._buildInputs()
    this._buildOutputs()
    this._buildProperties()
  }

  instanceDefinition() {
    return this._instanceDefinition
  }

  dispatcher() {
    return this._dispatcher
  }

  in() {
    return this._inputs
  }

  out() {
    return this._outputs
  }

  properties() {
    return this._properties
  }

  tick() {
    throw `Ticklet ${this} did not redefined tick method`
  }

  _buildInputs() {
    this._inputs = {}

    this._instanceDefinition.ticklet().inputs().forEach(def=>{
      const input = new Input(this, def)
      this._inputs[def.name()] = ()=>input
    })
  }

  _buildOutputs() {
    this._outputs = {}

    this._instanceDefinition.ticklet().outputs().forEach(def=>{
      const output = new Output(this, def)
      this._outputs[def.name()] = ()=>output
    })
  }

  _buildProperties() {
    this._properties = {}

    this._instanceDefinition.properties().forEach(instanceProperty=>{
      const property = new Property(instanceProperty)
      this._properties[instanceProperty.definition().name()] = ()=>property.value()
    })
  }
}
