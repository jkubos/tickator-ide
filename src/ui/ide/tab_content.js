import React from 'react'
import UiState from '~/src/business/ui_state'

export default class TabContent extends React.Component {
  render() {
    const selectedTab = this.context.uiState.get('tabs', this.context.tabsId, 'selectedTab')

    if (selectedTab==this.props.for) {
      return <div>
        {this.props.children}
      </div>
    } else {
      return null
    }
  }
}

TabContent.propTypes = {
  for: React.PropTypes.string.isRequired
}

TabContent.contextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  tabsId: React.PropTypes.string.isRequired
}
