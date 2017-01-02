import {Validate} from '~/src/util/Validate'
import {Dispatcher} from '~/src/tickator/Dispatcher'
import {TickletDefinition} from '~/src/tickator/definition/TickletDefinition'
import {InstanceDefinition} from '~/src/tickator/definition/InstanceDefinition'
import {Input} from './Input'
import {Output} from './Output'
import {Property} from './Property'
import {Component} from './Component'

export class Ticklet {

  constructor(dispatcher, instanceDefinition, ownerComponent) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(instanceDefinition, InstanceDefinition)
    Validate.isA(instanceDefinition.ticklet(), TickletDefinition)
    Validate.isA(ownerComponent, Component)

    this._dispatcher = dispatcher
    this._instanceDefinition = instanceDefinition
    this._ownerComponent = ownerComponent

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

  propertyInstances() {
    return this._propertyInstances
  }

  initialize() {

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

    const parentProperties = this._ownerComponent.propertiesMap()

    this._propertyInstances = this._instanceDefinition.properties().map(instanceProperty=>{
      const property = new Property(instanceProperty, parentProperties)
      this._properties[instanceProperty.definition().name()] = ()=>property.value()
      return property
    })
  }
}
