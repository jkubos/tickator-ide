import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/Validate'

import {Screens} from '~/src/business/Screens'
import {BusinessSpace} from './BusinessSpace'
import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'

export class UiState {
  @observable width = -1
  @observable height = -1

  @observable navigation = []
  @observable _navigationIndex = -1

  @observable openedModal = undefined
  _openedModalCallback = undefined

  _handlers = []

  constructor(businessSpace) {
    Validate.isA(businessSpace, BusinessSpace)
    this._businessSpace = businessSpace

    //open help as default
    this.navigate(Screens.HELP)
  }

  init() {
    // const uuid = '433323e3-8d6e-43f8-927c-d61550a00b0c'
    const uuid = '5165e65b-55d2-40e3-a698-b3f5f2f00e42'

    if (this._businessSpace.exists(uuid)) {
      this.navigate(Screens.COMPONENT_FORM, {uuid})
    }
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

  @computed get selectedParams() {
    if (this._navigationIndex>=0 && this._navigationIndex<this.navigation.length) {
      return this.navigation[this._navigationIndex].params || {}
    } else {
      return {}
    }
  }

  navigate(screen, params) {
    //remove same items from history
    this.navigation = this.navigation.filter(i=>i.screen!=screen || i.params!=params)

    this._navigationIndex = this.navigation.length
    this.navigation.push({screen, params})
  }

  close() {
    this.navigation.pop()
    this._navigationIndex = this.navigation.length-1
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

  listHistory() {
    return this.navigation
  }

  openModal(name, params, onDone) {
    Validate.isNull(this.openedModal, "Try to open dialog when one is already opened!")

    this.openedModalParams = params
    this._openedModalCallback = onDone
    this.openedModal = name
  }

  closeModal(res) {
    this.openedModal = undefined
    if (this._openedModalCallback) {
      const tmpCallback = this._openedModalCallback
      this._openedModalCallback = undefined

      tmpCallback(res)
    }
  }

  onKeyUp(e) {
    if (e.key=='Escape') {
      this.closeModal({confirmed: false})
    }
  }

  onMouseUp(e) {
    this._handlers.forEach(handler=>handler(e))
  }

  registerOnGlobalTick(handler) {
    this._handlers.push(handler)
  }

  unregisterOnGlobalTick(handler) {
    this._handlers = this._handlers.filter(item=>handler!=item)
  }
}
