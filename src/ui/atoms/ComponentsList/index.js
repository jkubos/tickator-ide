import React from 'react'
import {UiState} from '~/src/business/UiState'
import style from './style.less'

export class ComponentsList extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return this.renderNode(this.context.uiState.getDefinitions().getComponentsRepository().getTreeRoot())
  }

  renderNode(node) {
    return <div>
      {Object.keys(node._subs).map((name, i)=><div key={i} className={style.node}>
        {name}
        <div className={style.subnode}>
          {this.renderNode(node._subs[name])}
        </div>
      </div>)}

      {Object.keys(node).filter(n=>n!=='_subs').map((name, i)=><div
        key={i}
        className={style.item}
        onClick={e=>this._onSelect(node[name])}>{name}</div>)}
    </div>
  }

  _onSelect(component) {
    this.context.uiState.openContext(component.id())
  }
}
