import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'

import {ImageButton} from '~/src/ui/quark/ImageButton'

@observer
export class InterfaceUsageDialog extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.INTERFACE_USAGE_DIALOG) {
      return null;
    }

    const params = this.context.uiState.openedModalParams

    const interfaceDefinition = params.interfaceUsage.refInterfaceDefinition
    const interfaceSide = params.interfaceUsage.definitionSide ? interfaceDefinition.definitionSideName : interfaceDefinition.otherSideName

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
        <div>
          <div><strong>Name</strong>: {params.interfaceUsage.name}</div>
          <div><strong>Type</strong>: {interfaceDefinition.name}</div>
          <div><strong>Side</strong>: {interfaceSide}</div>
          <br/>
          <ImageButton glyph='fa-exchange' label='Switch side' huge
            onClick={e=>params.interfaceUsage.definitionSide = !params.interfaceUsage.definitionSide} />
          <br/>
          <ImageButton glyph='fa-trash' label='Delete' huge onClick={e=>params.interfaceUsage.delete()} />
        </div>
    </div>
  }

  _onSelect(e, uuid) {
    this.context.uiState.closeModal({confirmed: true, uuid})
    e.stopPropagation()
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()
  }
}
