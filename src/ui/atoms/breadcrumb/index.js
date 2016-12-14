import React from 'react'
import style from './style.less'

export class Breadcrumb extends React.Component {
  render() {
    return <div className={style.main}>
      Selected: {['root', ...this.props.povInstancePath].join(' > ')}
    </div>
  }
}

Breadcrumb.propTypes = {
  povInstancePath: React.PropTypes.array.isRequired
}
