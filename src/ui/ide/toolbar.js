import React from 'react'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import ToolbarButton from './toolbar_button'
import {ENGINE_RUN, ENGINE_PAUSE, ENGINE_STEP, ENGINE_RESET} from '~/src/business/commands/commands'

export default class Toolbar extends React.Component {

  render() {
    return <nav className="navbar navbar-default">
      <div className="navbar-header">
        <span className="navbar-brand">Tickator</span>
      </div>
      <div className="container">
        <div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>

            <li><div className="divider-vertical"></div></li>

            <ToolbarButton disabled={false} icon={'fa-play'} tooltip='Run' onClick={e=>{
              this.props.commandsDispatcher.dispatch(ENGINE_RUN, {})
            }}/>

            <ToolbarButton disabled={false} icon={'fa-pause'} tooltip='Pause' onClick={e=>{
              this.props.commandsDispatcher.dispatch(ENGINE_PAUSE, {})
            }}/>

            <ToolbarButton disabled={false} icon={'fa-step-forward'} tooltip='Step one tick' onClick={e=>{
              this.props.commandsDispatcher.dispatch(ENGINE_STEP, {})
            }}/>

            <ToolbarButton disabled={false} icon={'fa-recycle'} tooltip='Reset' onClick={e=>{
              this.props.commandsDispatcher.dispatch(ENGINE_RESET, {})
            }}/>

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
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}

Toolbar.defaultProps = {
}

Toolbar.childContextTypes = {
}
