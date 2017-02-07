import React from 'react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Screens} from '~/src/business/Screens'

import {Button} from '~/src/ui/quark/Button'
import {CenteredContent} from '~/src/ui/quark/CenteredContent'

export class AddedElementTypeSelector extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <CenteredContent>
      <div className={styles.main}>
        <h1>What should be added?</h1>

        <div className={styles.buttons}>
          <Button label="Component" huge={true} onClick={e=>this._addComponent()}/>
          <Button label="Connector" huge={true} onClick={e=>this._addConnector()}/>
          <Button label="Converter" huge={true} onClick={e=>this._addConverter()}/>
        </div>
      </div>
    </CenteredContent>
  }

  _addConnector() {
    this.context.uiState.navigate(Screens.CONNECTOR_FORM)
  }

  _addComponent() {
    alert("Not yet implemented!")
  }

  _addConverter() {
    alert("Not yet implemented!")
  }
}
