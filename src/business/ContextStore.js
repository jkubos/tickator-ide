import {observable} from 'mobx'
import {Validate} from '~/src/util/validate'
import {Definitions} from '~/src/business/Definitions'
import {Engine} from '~/src/business/Engine'
import {Tools} from '~/src/util/tools'

export class ContextStore {
  constructor(definitions, rootComponent) {
    Validate.isA(definitions, Definitions)

    this._definitions = definitions
    this._engine = new Engine(definitions, rootComponent)

    this._uuid = Tools.generateUUID()
  }

  getUuid() {
    return this._uuid
  }

  getLabel() {
    return this._engine.getRootComponent().definition().name()
  }

  getEngine() {
    return this._engine
  }
}
