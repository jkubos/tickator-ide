import React from 'react'
import Engine from '~/src/business/engine'

export default class PropertiesView extends React.Component {

  render() {
    return <table className="table table-striped table-bordered table-condensed">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>a</td>
          <td>b</td>
          <td>c</td>
        </tr>
      </tbody>
    </table>
  }
}

PropertiesView.contextTypes = {
  engine: React.PropTypes.instanceOf(Engine).isRequired
}
