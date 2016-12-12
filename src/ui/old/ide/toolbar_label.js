import React from 'react'

export default class ToolbarLabel extends React.Component {

  render() {
    return <li className="navbar-text">{this.props.message}</li>
  }
}

ToolbarLabel.propTypes = {
  message: React.PropTypes.string
}
