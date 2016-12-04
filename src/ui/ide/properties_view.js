import React from 'react'
import Engine from '~/src/business/engine'
import Ticklet from '~/src/tickator/instance/ticklet'
import Component from '~/src/tickator/instance/component'

export default class PropertiesView extends React.Component {

  render() {
    let selectedInstance = this.props.instance

    if (this.props.selectedInstanceName) {
      selectedInstance = selectedInstance._findInstance(this.props.selectedInstanceName)
    }

    const properties = selectedInstance.propertyInstances()

    return <div>
      <strong>Selected: {this.props.selectedInstanceName || "root"}</strong>

      <table className="table table-striped table-bordered table-condensed">
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
              <td>{property.definition().defaultValue()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  }
}

PropertiesView.propTypes = {
  instance: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Ticklet),
    React.PropTypes.instanceOf(Component)
  ]).isRequired,
  selectedInstanceName: React.PropTypes.string.isRequired
}

PropertiesView.contextTypes = {
  engine: React.PropTypes.instanceOf(Engine).isRequired
}
