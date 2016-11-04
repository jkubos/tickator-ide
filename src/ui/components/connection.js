import React from 'react';
import ConnectionDefinition from '../../tickator/connection_definition'

export default class Connection extends React.Component {
  render() {
    return <g>
      <polyline
        points={this.props.geom.map(a=>`${a.x},${a.y}`).join(" ")}
        stroke="white"
        strokeWidth="8"
        fill="none" />

      <polyline
        points={this.props.geom.map(a=>`${a.x},${a.y}`).join(" ")}
        stroke="red"
        strokeWidth="2"
        fill="none" />
    </g>
  }

  getChildContext() {
    return {}
  }
}

Connection.propTypes = {
  def: React.PropTypes.instanceOf(ConnectionDefinition).isRequired,
  geom: React.PropTypes.array.isRequired
}

Connection.defaultProps = {
}

Connection.childContextTypes = {
}
