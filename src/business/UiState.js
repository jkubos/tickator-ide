import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/Validate'
// import {Definitions} from '~/src/business/Definitions'
import {Screens} from '~/src/business/Screens'

export class UiState {
  @observable width = -1
  @observable height = -1

  @observable navigation = []
  @observable _navigationIndex = -1

  @observable openedModal = undefined
  _openedModalCallback = undefined

  constructor(/*definitions*/) {
    // Validate.isA(definitions, Definitions)
    // this._definitions = definitions

    //open help as default
    this.navigate(Screens.HELP)

    //temporary
    // this.navigate(Screens.INTERFACE_FORM)
    // this.navigate(Screens.HISTORY)
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
      return this.navigation[this._navigationIndex].params
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
}
