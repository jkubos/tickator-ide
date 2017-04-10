import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'
import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'

@observer
export class FavoritesDialog extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.FAVORITES_MODAL) {
      return null;
    }

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
      <div>
        {this.context.space
          .getAll()
          .filter(o=>o.favorite)
          .map((o, i)=>{
          return <div
              className={styles.result}
              key={i}
              onClick={e=>this._onSelect(e, o.businessObject.uuid)}>
            {this._renderType(o)} {o.name}
          </div>
        })}
      </div>
    </div>
  }

  _onSelect(e, uuid) {
    this.context.uiState.closeModal({confirmed: true, uuid})
    e.stopPropagation()

    this.setState({input: ''})
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()

    this.setState({input: ''})
  }

  _renderType(o) {
    if (o instanceof ComponentDefinition) {
      return <i className="fa fa-microchip"></i>
    } else if (o instanceof  InterfaceDefinition) {
      return <i className="fa fa-exchange"></i>
    }

    return null
  }
}
