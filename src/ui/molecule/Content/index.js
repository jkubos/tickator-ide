import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Screens} from '~/src/business/Screens'

import {AddedElementTypeSelector} from '~/src/ui/molecule/AddedElementTypeSelector'

const mapping = {}
mapping[Screens.SELECT_ADDED_ELEMENT_TYPE] = (uuid)=><AddedElementTypeSelector/>

@observer
export class Content extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <div className={styles.main}>
      {mapping[this.context.uiState.selectedScreen] && mapping[this.context.uiState.selectedScreen](this.context.uiState.selectedUuid)}
    </div>
  }
}
