import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import Property from '~/src/tickator/instance/property'

export default class Component {
  constructor(dispatcher, instanceDefinition) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(instanceDefinition, InstanceDefinition)
    Validate.valid(instanceDefinition.component()!==undefined, 'Component expected, got ticklet!')
    this._dispatcher = dispatcher
    this._instanceDefinition = instanceDefinition
  }

  definition() {
    return this._instanceDefinition.definition()
  }

  instanceDefinition() {
    return this._instanceDefinition
  }

  properties() {
    return this._properties
  }

  build() {
    this._buildInstances()
    this._wireInstances()
    this._buildProperties()
  }

  _buildInstances() {
    this._instances = this._instanceDefinition.component().instances().map(instance=>{
      if (instance.component()) {
        throw "Implement me!"
      } else if (instance.ticklet()) {
        let klass = instance.ticklet().klass()
        let ticklet = new klass(this._dispatcher, instance)

        if (instance.ticklet().autostart()) {
          this._dispatcher.schedule(ticklet)
        }

        return ticklet
      } else {
        throw `Unknown instance type ${instance.type()}`
      }
    })
  }

  _wireInstances() {
    this._instanceDefinition.component().connections().forEach(connection=>{
      const instanceFrom = this._findInstance(connection.fromInstance())
      const output = instanceFrom.out()[connection.fromOutput()]()

      const instanceTo = this._findInstance(connection.toInstance())
      const input = instanceTo.in()[connection.toInput()]()

      output.addDepending(input)
      input.bind(output)
    })
  }

  _findInstance(name) {
    const res = this._instances.filter(instance=>instance.instanceDefinition().name()===name)

    Validate.ofSize(res, 1, `Found ${res.length} instances with name ${name}, expected exactly one`)

    return res[0]
  }

  _buildProperties() {
    this._properties = this._instanceDefinition.properties().map(prop=>{
      return new Property(prop)
    })
  }
}
