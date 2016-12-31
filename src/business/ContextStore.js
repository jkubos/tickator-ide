import {observable} from 'mobx'
import {Validate} from '~/src/util/validate'
import {Definitions} from '~/src/business/Definitions'
import {Engine} from '~/src/business/Engine'

export class ContextStore {
  @observable rootComponent = undefined

  constructor(definitions, rootComponent) {
    Validate.isA(definitions, Definitions)

    this._definitions = definitions

    this.rootComponent = definitions.getComponentsRepository().get(rootComponent)

    this._engine = new Engine(definitions, rootComponent)
  }

  getEngine() {
    return this._engine
  }
}
