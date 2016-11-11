import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import ComponentDefinition from '~/src/tickator/definition/component_definition'

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

  build() {
    this.buildInstances()
    this.wireInstances()
  }

  buildInstances() {
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

  wireInstances() {
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
}
