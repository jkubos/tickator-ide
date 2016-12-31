import React from 'react'
import {observer} from 'mobx-react'
import jQuery from 'jquery'
import ReactDOM from 'react-dom'
import {UiState} from '~/src/business/UiState'

@observer
export class InputLine extends React.Component {
  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.inputLine).focus();
  }

  render() {
    return <div style={{
      padding: 3
    }}>
      <input ref="inputLine" style={{
        width: "100%"
      }} onKeyUp={e=>this._onKeyUp(e)}/>
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
