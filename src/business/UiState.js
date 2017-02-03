import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/Validate'
import {Definitions} from '~/src/business/Definitions'
import {ContextStore} from './ContextStore'

export class UiState {
  @observable width = -1
  @observable height = -1

  @observable context = undefined

  constructor(definitions) {
    Validate.isA(definitions, Definitions)
    this._definitions = definitions
  }

  updateContentSize(width, height) {
    this.width = width
    this.height = height
  }

  getDefinitions() {
    return this._definitions
  }
}
