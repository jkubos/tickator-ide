import React from 'react'
import {observer} from 'mobx-react'
import style from './style.less'
import {UiState} from '~/src/business/UiState'

@observer
export class Breadcrumb extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (!this.context.uiState.currentContextStore) {
      return null
    }

    return <div className={style.main}>
      Context: {this.context.uiState.currentContextStore.getDisplayedPath().join(' > ')}
    </div>
  }
}
