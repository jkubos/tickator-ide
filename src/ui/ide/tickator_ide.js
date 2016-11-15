import React from 'react'
import ComponentSchema from '~/src/ui/component/graphic/component_schema'
import ConsoleView from '~/src/ui/ide/console_view'
import Toolbar from '~/src/ui/ide/toolbar'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'

export default class TickatorIDE extends React.Component {

  render() {
    const logLines = this.props.uiState.get('engine', 'logLines')

    return <div className="container container-full">
      <Toolbar/>

      <div className="row">
        <div className="col-lg-2">
          TREE
        </div>
        <div className="col-md-10">
          {/*<ComponentSchema def={engine.rootInstance().definition()} width={800} height={600}/>*/}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <ConsoleView lines={logLines}/>
        </div>
      </div>
    </div>
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      commandsDispatcher: this.props.commandsDispatcher
    }
  }
}

TickatorIDE.propTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}

TickatorIDE.childContextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}
