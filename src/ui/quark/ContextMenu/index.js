import React from 'react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'

import {ImageButton} from '../ImageButton'

export class ContextMenu extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  constructor(props) {
    super(props)

    this.state = {opened: false}

    this._handler = (e)=>this._close()
  }

  componentWillMount() {
    this.context.uiState.registerOnGlobalTick(this._handler)
  }

  componentWillUnmount() {
    this.context.uiState.unregisterOnGlobalTick(this._handler)
  }

  render() {
    return <span style={{position: 'relative'}}>
      <ImageButton glyph="fa-ellipsis-h" huge onClick={e=>this._open()}/>
      {this.state.opened && <div ref='menu' className={styles.menu}>
        {this.props.children}
      </div>}
    </span>
  }

  _open() {
    this.setState({opened: !this.state.opened})
  }

  _close() {
    if (this.state.opened) {
      setTimeout(()=>this.setState({opened: false}), 0)
    }
  }
}
