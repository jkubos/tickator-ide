import React from 'react'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'
import Engine from '~/src/business/engine'
import Toolbar from '~/src/ui/quarks/toolbar'
import ToolbarButton from '~/src/ui/quarks/toolbar_button'
import ToolbarSeparator from '~/src/ui/quarks/toolbar_separator'
import Logo from '~/src/ui/atoms/logo'
import EngineInfo from '~/src/ui/atoms/engine_info'

export default class MainToolbar extends React.Component {

  render() {
    return <Toolbar>
      <Logo/>

      <ToolbarSeparator />

      <ToolbarButton
        icon="fa-play"
        tooltip="Run"
        onClick={e=>console.log(e)}
        disabled={false}
      />

      <ToolbarButton
        icon="fa-pause"
        tooltip="Pause"
        onClick={e=>console.log(e)}
        disabled={true}
      />

      <ToolbarButton
        icon="fa-step-forward"
        tooltip="Step one tick"
        onClick={e=>console.log(e)}
        disabled={false}
      />

      <ToolbarButton
        icon="fa-eraser"
        tooltip="Reset"
        onClick={e=>console.log(e)}
        disabled={false}
      />

      <ToolbarSeparator />

      <EngineInfo/>

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
