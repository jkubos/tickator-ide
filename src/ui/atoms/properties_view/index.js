import React from 'react'
import {observer} from 'mobx-react'
import Ticklet from '~/src/tickator/instance/ticklet'
import Component from '~/src/tickator/instance/component'
import {UiState} from '~/src/business/UiState'
import styles from './style.less'

@observer
export class PropertiesView extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (!this.context.uiState.currentContextStore) {
      return null
    }

    const selectedInstance = this.context.uiState.currentContextStore.getSelectedInstance()

    const properties = selectedInstance.propertyInstances()

    return <div>
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
