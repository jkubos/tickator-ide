import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import TickletDefinition from '~/src/tickator/definition/ticklet_definition'

export default class Ticklet {
  
  constructor(dispatcher, definition) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(definition, TickletDefinition)
    this.dispatcher = dispatcher
    this.definition = definition
  }

  tick() {
    throw `Ticklet ${this} did not redefined tick method`
  }
}
