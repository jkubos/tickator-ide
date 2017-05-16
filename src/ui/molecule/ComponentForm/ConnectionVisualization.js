import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Rectangle} from '~/src/util/geometry/Rectangle'

import {Connection} from '~/src/tickator/definition/Connection'
import {ComponentImplementation} from '~/src/tickator/definition/ComponentImplementation'

@observer
export class ConnectionVisualization extends React.Component {

  static propTypes = {
    connection: React.PropTypes.instanceOf(Connection).isRequired,
    componentImplementation: React.PropTypes.instanceOf(ComponentImplementation).isRequired,
    geometry: React.PropTypes.object.isRequired,
    registerDrag: React.PropTypes.func.isRequired,
    reportDropTarget: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <g>
      <polyline
        points={this.props.geometry.pathPoints.map(p=>`${p.x},${p.y}`).join(" ")}
        style={{fill: 'none', stroke: 'red', strokeWidth: 4}} />
    </g>
  }

}
