import React from 'react'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'
import Engine from '~/src/business/engine'
import Toolbar from '~/src/ui/quarks/toolbar'
import ToolbarButton from '~/src/ui/quarks/toolbar_button'
import ToolbarSeparator from '~/src/ui/quarks/toolbar_separator'
import Logo from '~/src/ui/atoms/logo'
import EngineInfo from '~/src/ui/atoms/engine_info'
import {Breadcrumb} from '~/src/ui/atoms/breadcrumb'

import {
  ENGINE_RUN,
  ENGINE_PAUSE,
  ENGINE_STEP,
  ENGINE_RESET
} from '~/src/business/commands/commands'

import {
  ENGINE_STATE_RUNNING,
  ENGINE_STATE_PAUSED
} from '~/src/business/consts'

export default class MainToolbar extends React.Component {

  static contextTypes = {
    commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    const engineState = this.context.uiState.get('engine', 'state')

    return <Toolbar>
      <Logo/>

      <ToolbarSeparator />

      <ToolbarButton
        icon="fa-play"
        tooltip="Run"
        onClick={e=>{
          this.context.commandsDispatcher.dispatch(ENGINE_RUN, {})
        }}
        disabled={engineState!==ENGINE_STATE_PAUSED}
      />

      <ToolbarButton
        icon="fa-pause"
        tooltip="Pause"
        onClick={e=>{
          this.context.commandsDispatcher.dispatch(ENGINE_PAUSE, {})
        }}
        disabled={engineState!==ENGINE_STATE_RUNNING}
      />

      <ToolbarButton
        icon="fa-step-forward"
        tooltip="Step one tick"
        onClick={e=>{
          this.context.commandsDispatcher.dispatch(ENGINE_STEP, {})
        }}
        disabled={engineState!==ENGINE_STATE_PAUSED}
      />

      <ToolbarButton
        icon="fa-eraser"
        tooltip="Reset"
        onClick={e=>{
          this.context.commandsDispatcher.dispatch(ENGINE_RESET, {})
        }}
        disabled={false}
      />

      <ToolbarSeparator />

      <EngineInfo/>

      <ToolbarSeparator />

      <Breadcrumb
        povInstancePath={this.context.uiState.get('ui', 'povInstancePath')}
      />

      <ToolbarSeparator />

      <ToolbarButton
        icon="fa-info-circle"
        tooltip="About"
        onClick={e=>console.log(e)}
        disabled={false}
      />

    </Toolbar>
  }

}
