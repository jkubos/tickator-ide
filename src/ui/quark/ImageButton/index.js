import React from 'react'
import classNames from 'classnames'
import styles from './style.less'

export class ImageButton extends React.Component {

  static propTypes = {
    glyph: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    huge: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  }

  render() {
    return <div className={classNames(styles.main, this.props.huge ? styles.huge : '')} onClick={e=>this._onClick(e)}>
      <i className={`fa ${this.props.glyph}`}></i>{this.props.label && <span>&nbsp;{this.props.label}</span>}
    </div>
  }

  _onClick(e) {
    e.stopPropagation()
    e.preventDefault()

    if (this.props.onClick) {
      this.props.onClick()
    }    
  }
}
