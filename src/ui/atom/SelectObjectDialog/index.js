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
export class SelectObjectDialog extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.SELECT_OBJECT_MODAL) {
      return null;
    }

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
        <div>
          <input
            ref="input"
            autoFocus
            className={styles.input}
            defaultValue=""
            onClick={e=>e.stopPropagation()}
            onChange={e=>this._onChange(e)}
            onFocus={e=>this._onFocus(e)}
            autoCapitalize="off"
          />

        {this.context.space
          .findByTypes(this.context.uiState.openedModalParams.types)
          .filter(o=>o.name.includes(this.state ? this.state.input : ''))
          .map((o, i)=>{
          return <div key={i}>
            <div
                className={styles.result}
                onClick={e=>this._onSelect(e, o.businessObject.uuid)}>
              {this._renderType(o)} {o.name}
            </div>
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

  _onFocus() {
  }

  _onChange() {
    this.setState({input: this.refs.input.value})
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
