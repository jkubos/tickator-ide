import React from 'react'
import classNames from 'classnames'
// import styles from './style.less'

import {UiState} from '~/src/business/UiState'

import {CenteredContent} from '~/src/ui/quark/CenteredContent'

export class HistoryScreen extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <div>
      Tutaj hentaj
      {this.context.uiState.listHistory().map((item, index)=>{
        console.log(item);
        return <div key={index}>{item.screen}:{item.uuid}</div>
      })}
    </div>
  }
}
