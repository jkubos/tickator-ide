import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import ComponentDefinition from '~/src/tickator/definition/component_definition'

export default class Component {
  constructor(dispatcher, definition) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(definition, ComponentDefinition)
    this.dispatcher = dispatcher
    this.definition = definition
  }

  build() {
    this.buildInstances()
    this.wireInstances()
  }

  buildInstances() {
    this.instances = this.definition.instances().map(instance=>{
      if (instance.component()) {
        throw "Implement me!"
      } else if (instance.ticklet()) {
        let klass = instance.ticklet().klass()
        let ticklet = new klass(this.dispatcher, instance.ticklet())

        if (instance.ticklet().autostart()) {
          this.dispatcher.schedule(ticklet)
        }

        return ticklet
      } else {
        throw `Unknown instance type ${instance.type()}`
      }
    })
  }

  wireInstances() {

  }
}
