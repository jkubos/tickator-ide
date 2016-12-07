import React from 'react'
import UiState from '~/src/business/ui_state'
import {SELECT_TAB} from '~/src/business/commands/commands'
import CommandsDispatcher from '~/src/business/commands_dispatcher'

export default class Tabs extends React.Component {

  componentDidMount() {
    this.context.commandsDispatcher.dispatch(SELECT_TAB, {
      tabsId: this.props.id,
      selectedTab: this.props.selectedTab
    })
  }

  render() {
    return <div className="panel panel-default">
      <div className="panel-body">
        <div className="btn-group" role="group">
          {this.props.children.filter(c=>c.type.name=='TabHeader')}
        </div>

        {this.props.children.filter(c=>c.type.name=='TabContent')}
      </div>
    </div>
  }

  getChildContext() {
    return {
      tabsId: this.props.id
    }
  }
}

Tabs.propTypes = {
  id: React.PropTypes.string.isRequired,
  selectedTab: React.PropTypes.string.isRequired
}

Tabs.childContextTypes = {
  tabsId: React.PropTypes.string.isRequired
}

Tabs.contextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}
