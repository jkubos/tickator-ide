import {observable, computed, createTransformer} from 'mobx'
import {Validate} from '~/src/util/Validate'
import {Definitions} from '~/src/business/Definitions'
import {ContextStore} from './ContextStore'

export class UiState {
  @observable width = -1
  @observable height = -1

  @observable currentContextStore = undefined

  @observable contextStores = []
  selectedTabs = {}

  @observable fake = 0

  constructor(definitions) {
    Validate.isA(definitions, Definitions)
    this._definitions = definitions

    //test initialization
    // this.openContext('org.tickator.test.FibonacciGenerator')
    // this.openContext('org.tickator.test.calculator.Calculator')
    // this.openContext('org.tickator.test.calculator.Engine')
    // this.openContext('org.tickator.test.calculator.Calculation')
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
    this.contextStores.push(contextStore)
    this.currentContextStore = contextStore
  }

  selectContextStore(uuid) {
    this.currentContextStore = this.contextStores.filter(c=>c.getUuid()==uuid)[0]
  }
}
