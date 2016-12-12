import React from 'react'
import UiState from '~/src/business/ui_state'
import {SELECT_TAB} from '~/src/business/commands/commands'
import CommandsDispatcher from '~/src/business/commands_dispatcher'

export default class TabHeader extends React.Component {
  render() {
    const selectedTab = this.context.uiState.get('tabs', this.context.tabsId, 'selectedTab')
    const state = selectedTab==this.props.name ? '' : 'disabled'

    return <div className={"btn btn-default"+state} onClick={e=>this._onSelect()}>{this.props.label}</div>
  }

  _onSelect() {
    this.context.commandsDispatcher.dispatch(SELECT_TAB, {
      tabsId: this.context.tabsId,
      selectedTab: this.props.name
    })
  }
}

TabHeader.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired
}

TabHeader.contextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  tabsId: React.PropTypes.string.isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}
