import React from 'react'

export default class Breadcrumb extends React.Component {
  render() {
    return <div>
      {['root', ...this.props.povInstancePath].join(' > ')}
    </div>
  }
}

Breadcrumb.propTypes = {
  povInstancePath: React.PropTypes.array.isRequired
}
