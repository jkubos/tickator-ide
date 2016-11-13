import React from 'react'

export default class ToolbarButton extends React.Component {

  render() {
    return <li className={this.props.disabled?"disabled":""}>
      <a href="#" onClick={this.props.onClick}>
        <i className={`fa ${this.props.icon}`}></i>
      </a>
    </li>
  }

  getChildContext() {
    return {}
  }
}

ToolbarButton.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  icon: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

ToolbarButton.defaultProps = {
}

ToolbarButton.childContextTypes = {
}
