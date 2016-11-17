import React from 'react'
import Engine from '~/src/business/engine'
import Ticklet from '~/src/tickator/instance/ticklet'
import Component from '~/src/tickator/instance/component'

export default class PropertiesView extends React.Component {

  render() {
    const properties = this.props.instance.properties()
    return <table className="table table-striped table-bordered table-condensed">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(property=><tr key={property.definition().name()}>
            <td>{property.definition().name()}</td>
            <td>{property.value()}</td>
            <td>c</td>
          </tr>
        )}
      </tbody>
    </table>
  }
}

PropertiesView.propTypes = {
  instance: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Ticklet),
    React.PropTypes.instanceOf(Component)
  ]).isRequired
}

PropertiesView.contextTypes = {
  engine: React.PropTypes.instanceOf(Engine).isRequired
}
