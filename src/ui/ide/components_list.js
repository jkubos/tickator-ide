import React from 'react'
import Engine from '~/src/business/engine'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {
  ENGINE_LOAD_COMPONENT
} from '~/src/business/commands/commands'

export default class ComponentsList extends React.Component {

  render() {
    const definitions = this.context.engine.componentRepository().definitions()
    const selectedComponent = this.context.engine.rootInstance().definition().name()
    
    return <ul className="list-group">
      {definitions.map((comp, i)=><li
        className={`list-group-item ${comp.name()===selectedComponent ? 'active': ''}`}
        key={i}
        onClick={e=>this._onSelect(comp)}
      >
        {comp.name()}
      </li>)}
    </ul>
  }

  _onSelect(component) {
    this.context.commandsDispatcher.dispatch(ENGINE_LOAD_COMPONENT, {name: component.name()})
  }
}

ComponentsList.contextTypes = {
  engine: React.PropTypes.instanceOf(Engine).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}
