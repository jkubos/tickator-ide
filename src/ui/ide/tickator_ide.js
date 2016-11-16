import React from 'react'
import ComponentSchema from '~/src/ui/component/graphic/component_schema'
import ConsoleView from '~/src/ui/ide/console_view'
import ComponentsList from '~/src/ui/ide/components_list'
import PropertiesView from '~/src/ui/ide/properties_view'
import Toolbar from '~/src/ui/ide/toolbar'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'
import Engine from '~/src/business/engine'

export default class TickatorIDE extends React.Component {

  render() {
    const logLines = this.props.uiState.get('engine', 'logLines')

    return <div className="container container-full">
      <Toolbar/>

      <div className="row">
        <div className="col-lg-2">
          <ComponentsList />
        </div>
        <div className="col-md-10">
          <ComponentSchema def={this.props.engine.rootInstance().definition()} width={950} height={500}/>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-2">
          <PropertiesView />
        </div>
        <div className="col-lg-10">
          <ConsoleView lines={logLines}/>
        </div>
      </div>
    </div>
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      commandsDispatcher: this.props.commandsDispatcher,
      engine: this.props.engine
    }
  }
}

TickatorIDE.propTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
  engine: React.PropTypes.instanceOf(Engine).isRequired
}

TickatorIDE.childContextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
  engine: React.PropTypes.instanceOf(Engine).isRequired
}
