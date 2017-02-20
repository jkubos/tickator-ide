import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {Button} from '~/src/ui/quark/Button'
import {ImageButton} from '~/src/ui/quark/ImageButton'

@observer
export class TypesList extends React.Component {

  static propTypes = {
    types: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <span className={styles.types}>
      &lt;
        {this.props.types.map(t=><span className={styles.type} onClick={e=>console.log(e)} key={t.uuid}>{t.name}</span>)}
        {this.props.types.length==0 && <span>∅</span>}
      &gt;

      <ImageButton glyph="fa-plus" label="Add type" huge={false} onClick={e=>this._addType()} />
    </span>
  }

  _addType() {
    const names = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'new']


    this.props.types.push({
      name: names[Math.min(names.length-1, this.props.types.length)],
      uuid: Tools.generateUUID()
    })
  }
}
