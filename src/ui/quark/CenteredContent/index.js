import React from 'react'
import classNames from 'classnames'
import styles from './style.less'

export class CenteredContent extends React.Component {

  render() {
    return <div className={styles.main} onClick={e=>this._onClick(e)}>
      {this.props.children}
    </div>
  }

  _onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
}
