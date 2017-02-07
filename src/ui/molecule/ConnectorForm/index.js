import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {ImageButton} from '~/src/ui/quark/ImageButton'

@observer
export class ConnectorForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <svg className={styles.main} width={1400} height={800}>
      <text
        textAnchor='middle'
        alignmentBaseline='middle'
        fontSize="30"
        x={400}
        y={50}
        fill='white'
        onClick={e=>this._onTitleClick(e)}
        >
          Binary operation
      </text>

      <text
        textAnchor='middle'
        alignmentBaseline='middle'
        fontSize="30"
        x={400}
        y={750}
        fill='white'
        onClick={e=>this._onTitleClick(e)}
        >
          Binary operation 2
      </text>

      <text
        textAnchor='end'
        alignmentBaseline='middle'
        fontSize="20"
        x={1100}
        y={100}
        fill='white'>
          Request
      </text>

      <text
        textAnchor='start'
        alignmentBaseline='middle'
        fontSize="20"
        x={100}
        y={100}
        fill='white'>
          Operation
      </text>
    </svg>
  }

  _onAdd() {

  }

  _onTitleClick() {
    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: "Binary operation"}, e=>console.log(e))
  }
}


/*
 <div>
  <input type='input' value="name"/>
</div>

<div>
  <svg
      style={{border: '1px solid red', marginTop: 10, marginBottom: 10}}
      width={600}
      height={300}
    >

      <rect
        x={10}
        y={10}
        width={50}
        height={50}
        rx="2"
        ry="2"
        style={{
          fill: '#fdf6e3' ,
          strokeWidth: 2,
          stroke: '#586e75'
        }}
        >
      </rect>

      <foreignObject x="100" y="10" width="100" height="150" style={{border: '1px solid green', overflow: 'hidden'}}>
        <input value="xx" xmlns="http://www.w3.org/1999/xhtml"></input>
      </foreignObject>
  </svg>

</div>

<div>
  <ImageButton glyph="fa-plus" label="Add pin" onClick={this._onAdd} huge={true}/>
</div>

</div>
*/
