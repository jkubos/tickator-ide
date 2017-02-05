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
    //remove same items from history
    this.navigation = this.navigation.filter(i=>i.screen!=screen || i.uuid!=uuid)

    this._navigationIndex = this.navigation.length
    this.navigation.push({screen, uuid})
  }

  @computed get canNavigateNext() {
    return this._navigationIndex + 1 < this.navigation.length
  }

  @computed get canNavigatePrevious() {
    return this._navigationIndex >= 0
  }

  navigatePrevious() {
    this._navigationIndex = Math.max(-1, this._navigationIndex-1)
  }

  navigateNext() {
    this._navigationIndex = Math.min(this.navigation.length-1, this._navigationIndex+1)
  }
}
