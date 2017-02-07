import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {ImageButton} from '~/src/ui/quark/ImageButton'

const WIDTH = 800
const MIN_HEIGHT = 300

@observer
export class ConnectorForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {

    const data = {
      name: "binary operation",
      definitionSideName: "operation",
      otherSideName: "request",
      pins: [
        {name: "a", direction: 'in'},
        {name: "b", direction: 'in'},
        {name: "res", direction: 'out'}
      ]
    }

    return <svg className={styles.main} width={WIDTH} height={MIN_HEIGHT}>
      <text
        textAnchor='middle'
        alignmentBaseline='hanging'
        fontSize="30"
        x={400}
        y={10}
        fill='white'
        onClick={e=>this._onTitleClick(e)}
        >
          {data.name}
      </text>

      <text
        textAnchor='start'
        alignmentBaseline='middle'
        fontSize="20"
        x={50}
        y={50}
        fill='white'>
          {data.definitionSideName}
      </text>

      <text
        textAnchor='end'
        alignmentBaseline='middle'
        fontSize="20"
        x={750}
        y={50}
        fill='white'>
          {data.otherSideName}
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
