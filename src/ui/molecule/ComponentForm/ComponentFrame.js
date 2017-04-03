import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {EditableText} from '~/src/ui/atom/EditableText'


@observer
export class ComponentFrame extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  _width = 800
  _height = 600

  render() {
    return <svg className={styles.componentFrame} width={this._width} height={this._height}>
      <rect className={styles.frame} x="0" y="0" width={this._width} height={this._height}/>
    </svg>
  }
}
