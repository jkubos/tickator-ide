import {observable, computed, createTransformer} from 'mobx'
import Validate from '~/src/util/validate'

export class UiState {
  @observable width = 800
  @observable height = 800

  selectedTabs = {}

  @observable fake = 0

  constructor() {
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
}
