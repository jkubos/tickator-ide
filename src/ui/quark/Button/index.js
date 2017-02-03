import React from 'react'
import classNames from 'classnames'
import styles from './style.less'

export class Button extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    huge: React.PropTypes.bool.isRequired
  }

  render() {
    return <div className={classNames(styles.main, this.props.huge ? styles.huge : '')}>
      <span>{this.props.label}</span>
    </div>
  }
}
