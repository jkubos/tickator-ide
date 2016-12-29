import React from 'react'
import {Engine} from '~/src/business/engine'
import {Toolbar} from '~/src/ui/quarks/toolbar'
import {ToolbarButton} from '~/src/ui/quarks/toolbar_button'
import {ToolbarSeparator} from '~/src/ui/quarks/toolbar_separator'
import {Logo} from '~/src/ui/atoms/logo'
import {EngineInfo} from '~/src/ui/atoms/engine_info'
import {Breadcrumb} from '~/src/ui/atoms/breadcrumb'

export class MainToolbar extends React.Component {

  static contextTypes = {
    engine: React.PropTypes.instanceOf(Engine).isRequired
  }

  render() {
    return <Toolbar>
      <Logo/>

      <ToolbarSeparator />

      <ToolbarButton
        icon="fa-play"
        tooltip="Run"
        onClick={e=>this.context.engine.run()}
        disabled={this.context.engine.isRunning}
      />

      <ToolbarButton
        icon="fa-pause"
        tooltip="Pause"
        onClick={e=>this.context.engine.pause()}
        disabled={!this.context.engine.isRunning}
      />

      <ToolbarButton
        icon="fa-step-forward"
        tooltip="Step one tick"
        onClick={e=>this.context.engine.step()}
        disabled={this.context.engine.isRunning}
      />

      <ToolbarButton
        icon="fa-eraser"
        tooltip="Reset"
        onClick={e=>this.context.engine.reset()}
        disabled={false}
      />

      <ToolbarSeparator />

      <EngineInfo/>

      <ToolbarSeparator />

      {/* <Breadcrumb
        povInstancePath={this.context.uiState.get('ui', 'povInstancePath')}
      /> */}

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
