import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import ComponentDefinition from '~/src/tickator/definition/component_definition'
import InstanceProperty from '~/src/tickator/definition/instance_property'

export default class Component {
  constructor(dispatcher, definition) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(definition, ComponentDefinition)
    this._dispatcher = dispatcher
    this._definition = definition
  }

  definition() {
    return this._definition
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
    this._instances = this._definition.instances().map(instance=>{
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
    this._definition.connections().forEach(connection=>{
      const instanceFrom = this._findInstance(connection.fromInstance())
      const output = instanceFrom.out()[connection.fromOutput()]()

      const instanceTo = this._findInstance(connection.toInstance())
      const input = instanceTo.in()[connection.toInput()]()

      output.addDepending(input)
      input.bind(output)
    })
  }

  _findInstance(name) {
    const res = this._instances.filter(instance=>instance.instance().name()===name)

    Validate.ofSize(res, 1, `Found none or multiple instances with name ${name}`)

    return res[0]
  }

  _buildProperties() {
    this._properties = this._definition.properties().map(prop=>{
      console.error("Pass properties from outside!!!");
      return new InstanceProperty(prop, undefined)
    })
  }
}
