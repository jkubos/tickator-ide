import React from 'react'
import styles from './style.less'

export default class ToolbarButton extends React.Component {

  render() {
    return <div className={styles.main} title={this.props.label}>
      <a
        href="#"
        className={this.props.disabled ? styles.linkDisabled : styles.link}
        onClick={e=>this._onClick(e)}>
        <i className={`fa ${this.props.icon}`}></i>
      </a>
    </div>
  }

  _onClick(e) {
    e.stopPropagation()

    if (!this.props.disabled) {
      this.props.onClick(e)
    }
  }
}

ToolbarButton.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  icon: React.PropTypes.string.isRequired,
  tooltip: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}
