import React from 'react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Screens} from '~/src/business/Screens'

import {Button} from '~/src/ui/quark/Button'
import {CenteredContent} from '~/src/ui/quark/CenteredContent'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'
import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'

export class AddedElementTypeSelector extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    return <CenteredContent onClick={e=>this._close(e)}>
      <div className={styles.main}>
        <h1>What should be added?</h1>

        <div className={styles.buttons}>
          <Button label="Component" huge={true} onClick={e=>this._addComponent(e)}/>
          <Button label="Interface" huge={true} onClick={e=>this._addInterface(e)}/>
          <Button label="Converter" huge={true} onClick={e=>this._addConverter(e)}/>
        </div>
      </div>
    </CenteredContent>
  }

  _close(e) {
    this.context.uiState.close()
    e.stopPropagation()
  }

  _addInterface(e) {
    this.context.uiState.close()
    const obj = InterfaceDefinition.create(this.context.space)

    this.context.uiState.navigate(Screens.INTERFACE_FORM, {uuid: obj.businessObject.uuid})
    e.stopPropagation()
  }

  _addComponent(e) {
    this.context.uiState.close()
    const obj = ComponentDefinition.create(this.context.space)

    this.context.uiState.navigate(Screens.COMPONENT_FORM, {uuid: obj.businessObject.uuid})
    e.stopPropagation()
  }

  _addConverter(e) {
    this.context.uiState.close()
    alert("Not yet implemented!")
    e.stopPropagation()
  }
}
