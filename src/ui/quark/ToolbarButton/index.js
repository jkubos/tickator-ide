import React from 'react'
import styles from './style.less'
import classNames from 'classnames'

export class ToolbarButton extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    icon: React.PropTypes.string.isRequired,
    tooltip: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired
  }

  render() {
    return <div
      className={classNames(styles.main, this.props.disabled ? styles.disabled : '')}
      title={this.props.label}
      onClick={e=>this._onClick(e)}>
        <i className={`fa ${this.props.icon}`} />
    </div>
  }

  _onClick(e) {
    e.stopPropagation()

    if (!this.props.disabled) {
      this.props.onClick(e)
    }
  }
}
