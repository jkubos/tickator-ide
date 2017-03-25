import React from 'react'
import classNames from 'classnames'
import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Screens} from '~/src/business/Screens'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {CenteredContent} from '~/src/ui/quark/CenteredContent'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'

export class SearchScreen extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    return <CenteredContent>
        <div>
          <input
            ref="input"
            autoFocus
            className={styles.input}
            defaultValue=""
            onClick={e=>e.stopPropagation()}
            onKeyPress={e=>this._onKeyPress(e)}
            onFocus={e=>this._onFocus(e)}
            autoCapitalize="off"
          />

        {this.context.space.findByTypes([InterfaceDefinition]).map((o, i)=>{
          return <div
              className={styles.result}
              key={i}
              onClick={e=>this.context.uiState.navigate(Screens.INTERFACE_FORM, {uuid: o.businessObject.uuid})}>
            {o.name}
          </div>
        })}
      </div>
    </CenteredContent>
  }

  _onFocus() {

  }

  _onKeyPress() {

  }
}
