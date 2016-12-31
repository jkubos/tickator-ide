import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/validate'
import {Definitions} from '~/src/business/Definitions'
import {ContextStore} from './ContextStore'

export class UiState {
  @observable width = 800
  @observable height = 800

  @observable currentContextStore = undefined

  _contextStores = []
  selectedTabs = {}

  @observable fake = 0

  constructor(definitions) {
    Validate.isA(definitions, Definitions)
    this._definitions = definitions
  }

  updateContentSize(width, height) {
    this.width = width
    this.height = height
  }

  setSelectedTab(tabsName, tabName) {
    this.selectedTabs[tabsName] = tabName

    this.fake = this.fake + 1
  }

  getSelectedTab(tabsName, defaultTabName) {
    return this.getSelectedTabRaw([tabsName]) || defaultTabName
  }

  getSelectedTabRaw = createTransformer((tabsName)=>{
    const forceDep = this.fake + 1

    return this.selectedTabs[tabsName[0]]
  })

  getDefinitions() {
    return this._definitions
  }

  openContext(componentId) {
    const contextStore = new ContextStore(this._definitions, componentId)
    this._contextStores.push(contextStore)
    this.currentContextStore = contextStore
  }
}
