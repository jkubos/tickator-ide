import React from 'react'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import ToolbarButton from './toolbar_button'
import ToolbarLabel from './toolbar_label'
import {
  ENGINE_RUN,
  ENGINE_PAUSE,
  ENGINE_STEP,
  ENGINE_RESET
} from '~/src/business/commands/commands'
import UiState from '~/src/business/ui_state'
import {
  ENGINE_STATE_RUNNING,
  ENGINE_STATE_PAUSED
} from '~/src/business/consts'

export default class Toolbar extends React.Component {

  render() {
    const currentTick = this.context.uiState.get('engine', 'currentTick')
    const engineState = this.context.uiState.get('engine', 'state')

    return <nav className="navbar navbar-default">
      <div className="navbar-header">
        <span className="navbar-brand">Tickator</span>
      </div>
      <div className="container">
        <div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>

            <li><div className="divider-vertical"></div></li>

            <ToolbarButton disabled={engineState!==ENGINE_STATE_PAUSED} icon={'fa-play'} tooltip='Run' onClick={e=>{
              this.context.commandsDispatcher.dispatch(ENGINE_RUN, {})
            }}/>

            <ToolbarButton disabled={engineState!==ENGINE_STATE_RUNNING} icon={'fa-pause'} tooltip='Pause' onClick={e=>{
              this.context.commandsDispatcher.dispatch(ENGINE_PAUSE, {})
            }}/>

            <ToolbarButton disabled={engineState!==ENGINE_STATE_PAUSED} icon={'fa-step-forward'} tooltip='Step one tick' onClick={e=>{
              this.context.commandsDispatcher.dispatch(ENGINE_STEP, {})
            }}/>

            <ToolbarButton disabled={false} icon={'fa-eraser'} tooltip='Reset' onClick={e=>{
              this.context.commandsDispatcher.dispatch(ENGINE_RESET, {})
            }}/>

            <li><div className="divider-vertical"></div></li>

            <ToolbarLabel message={`Tick: ${currentTick}`}/>

            <li><div className="divider-vertical"></div></li>

            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  }

  getChildContext() {
    return {}
  }
}

Toolbar.propTypes = {
}

Toolbar.defaultProps = {
}

Toolbar.contextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}

Toolbar.childContextTypes = {
}
