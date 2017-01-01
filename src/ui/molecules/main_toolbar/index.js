import React from 'react'
import {observer} from 'mobx-react'
import {Toolbar} from '~/src/ui/quarks/toolbar'
import {ToolbarButton} from '~/src/ui/quarks/toolbar_button'
import {ToolbarSeparator} from '~/src/ui/quarks/toolbar_separator'
import {Logo} from '~/src/ui/atoms/logo'
import {EngineInfo} from '~/src/ui/atoms/engine_info'
import {Breadcrumb} from '~/src/ui/atoms/breadcrumb'
import {UiState} from '~/src/business/UiState'

@observer
export class MainToolbar extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {

    return <Toolbar>
      <Logo/>

      <ToolbarSeparator />

      {this.renderEnginePart()}

      <ToolbarSeparator />

      <Breadcrumb /> 

      <ToolbarSeparator />

      <ToolbarButton
        icon="fa-info-circle"
        tooltip="About"
        onClick={e=>console.log(e)}
        disabled={false}
      />

    </Toolbar>
  }

  renderEnginePart() {
    if (!this.context.uiState.currentContextStore) {
      return null
    }

    const engine = this.context.uiState.currentContextStore.getEngine()

    return [
      <ToolbarButton
        icon="fa-play"
        tooltip="Run"
        onClick={e=>engine.run()}
        disabled={engine.isRunning}
        key='1'
      />,

      <ToolbarButton
        icon="fa-pause"
        tooltip="Pause"
        onClick={e=>engine.pause()}
        disabled={!engine.isRunning}
        key='2'
      />,

      <ToolbarButton
        icon="fa-step-forward"
        tooltip="Step one tick"
        onClick={e=>engine.step()}
        disabled={engine.isRunning}
        key='3'
      />,

      <ToolbarButton
        icon="fa-eraser"
        tooltip="Reset"
        onClick={e=>engine.reset()}
        disabled={false}
        key='4'
      />,

      <ToolbarSeparator
        key='5'/>,

      <EngineInfo
        key='6'/>
    ]
  }

}
