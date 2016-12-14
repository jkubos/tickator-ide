import {observable} from 'mobx'

export default class UiStore {
  @observable selectedBottomTab = 'console'
  @observable contentWidth = 800
  @observable contentHeight = 600

  selectBottomTab(tab) {
    this.selectedBottomTab = tab
  }

  updateContentSize(width, height) {
    this.contentWidth = width
    this.contentHeight = height
  }
}
