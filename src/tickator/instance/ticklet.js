import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import TickletDefinition from '~/src/tickator/definition/ticklet_definition'
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import Input from './input'
import Output from './output'

export default class Ticklet {

  constructor(dispatcher, instance) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(instance, InstanceDefinition)
    Validate.isA(instance.ticklet(), TickletDefinition)

    this._dispatcher = dispatcher
    this._instance = instance

    this._buildInputs()
    this._buildOutputs()
    this._buildProperties()
  }

  instance() {
    return this._instance
  }

  dispatcher() {
    return this._dispatcher
  }

  in() {
    return this.inputsVal
  }

  out() {
    return this.outputsVal
  }

  properties() {
    return this.propertiesVal
  }

  tick() {
    throw `Ticklet ${this} did not redefined tick method`
  }

  _buildInputs() {
    this.inputsVal = {}

    this._instance.ticklet().inputs().forEach(def=>{
      const input = new Input(this, def)
      this.inputsVal[def.name()] = ()=>input
    })
  }

  _buildOutputs() {
    this.outputsVal = {}

    this._instance.ticklet().outputs().forEach(def=>{
      const output = new Output(this, def)
      this.outputsVal[def.name()] = ()=>output
    })
  }

  _buildProperties() {
    this.propertiesVal = {}

    this._instance.properties().forEach(prop=>{
      this.propertiesVal[prop.definition().name()] = ()=>prop.value()
    })
  }
}
