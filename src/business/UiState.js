import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/Validate'
import {Definitions} from '~/src/business/Definitions'
import {ContextStore} from './ContextStore'
import {Screens} from '~/src/business/Screens'

export class UiState {
  @observable width = -1
  @observable height = -1

  @observable navigation = []
  @observable _navigationIndex = -1

  @observable openedModal = undefined
  _openedModalCallback = undefined

  constructor(definitions) {
    Validate.isA(definitions, Definitions)
    this._definitions = definitions

    //open help as default
    this.navigate(Screens.HELP)

    //temporary
    this.navigate(Screens.INTERFACE_FORM)
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

  openModal(name, params, onDone) {
    this.openedModal = name
    this.openedModalParams = params
    this._openedModalCallback = onDone
  }

  closeModal(res) {
    this.openedModal = undefined
    if (this._openedModalCallback) {
      this._openedModalCallback(res)
      this._openedModalCallback = undefined
    }
  }

  onKeyUp(e) {
    if (e.key=='Escape') {
      this.closeModal({confirmed: false})
    }
  }
}
