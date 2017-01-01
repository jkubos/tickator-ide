import React from 'react'
import {UiState} from '~/src/business/UiState'
import style from './style.less'

export class ComponentsList extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    const definitions = this.context.uiState.getDefinitions().getComponentsRepository().definitions()
    const selectedComponent = ''

    return <div>
      {definitions.map((comp, i)=><div
        className={style.item}
        key={i}
        onClick={e=>this._onSelect(comp)}
      >
        ⤷{comp.name()}
      </div>)}
    </div>
  }

  _onSelect(component) {
    this.context.uiState.openContext(component.id())
  }
}
