import React from 'react';
import ConnectionDefinition from '~/src/tickator/definition/connection_definition'

export default class Connection extends React.Component {
  render() {
    return <g>
      {/*<polyline
        points={this.props.geom.map(a=>`${a.x},${a.y}`).join(" ")}
        stroke="white"
        strokeWidth="8"
        fill="none" />
      */}

      <polyline
        points={this.props.geom.map(a=>`${a.x},${a.y}`).join(" ")}
        stroke="#268bd2"
        strokeWidth="2"
        fill="none" />
    </g>
  }
}

Connection.propTypes = {
  def: React.PropTypes.instanceOf(ConnectionDefinition).isRequired,
  geom: React.PropTypes.array.isRequired
}
