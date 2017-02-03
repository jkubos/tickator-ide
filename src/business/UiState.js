import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/Validate'
import {Definitions} from '~/src/business/Definitions'
import {ContextStore} from './ContextStore'

export class UiState {
  @observable width = -1
  @observable height = -1

  @observable navigation = []
  @observable _navigationIndex = -1

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

  @computed get selectedScreen() {
    if (this._navigationIndex>=0 && this._navigationIndex<this.navigation.length) {
      return this.navigation[this._navigationIndex].screen
    } else {
      return undefined
    }
  }

  @computed get selectedUuid() {
    if (this._navigationIndex>=0 && this._navigationIndex<this.navigation.length) {
      return this.navigation[this._navigationIndex].uuid
    } else {
      return undefined
    }
  }

  navigate(screen, uuid) {
    this._navigationIndex = this.navigation.length
    this.navigation.push({screen, uuid})
  }
}
