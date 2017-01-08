import React from 'react'
import {observer} from 'mobx-react'
import jQuery from 'jquery'
import ReactDOM from 'react-dom'
import {UiState} from '~/src/business/UiState'
import styles from './style.less'

@observer
export class InputLine extends React.Component {
  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.inputLine).focus();
  }

  render() {
    return <div className={styles.main}>
      <input ref="inputLine" defaultValue="" className={styles.input} onKeyUp={e=>this._onKeyUp(e)}/>
    </div>
  }

  _onKeyUp(e) {
    if (e.keyCode == 13) {
      const value = jQuery(e.target).val()
      jQuery(e.target).val("")

      if (this.context.uiState.currentContextStore) {
        this.context.uiState.currentContextStore.getEngine().getPlatformApi().input(value)
      }
    }
  }
}
