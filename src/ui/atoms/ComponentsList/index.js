import React from 'react'
import {UiState} from '~/src/business/UiState'
import style from './style.less'

export class ComponentsList extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <div className={style.tree}>
      {this.renderNode(this.context.uiState.getDefinitions().getComponentsRepository().getTreeRoot())}
    </div>
  }

  renderNode(node) {
    return <ul className={style.level}>

        {Object.keys(node._subs).map((name, i)=><li key={i} className={style.item}>
          <span className={style.name}>{name}</span>
          {this.renderNode(node._subs[name])}
        </li>)}

        {Object.keys(node).filter(n=>n!=='_subs').map((name, i)=><li
          key={i}
          className={style.item}
          onClick={e=>this._onSelect(node[name])}><span className={style.name}>{name}</span></li>)}

    </ul>
  }

  _onSelect(component) {
    this.context.uiState.openContext(component.id())
  }
}
