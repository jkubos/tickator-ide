import React from 'react'
import ReactDOM from 'react-dom'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {
  USER_INPUT_LINE
} from '~/src/business/commands/commands'

export default class InputLine extends React.Component {

  constructor() {
    super()
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
      const value = $(e.target).val()
      $(e.target).val("")

      this.context.commandsDispatcher.dispatch(USER_INPUT_LINE, {value})
    }
  }
}

InputLine.contextTypes = {
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}
