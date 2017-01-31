import React from 'react'
import {observer} from 'mobx-react'
import deepEqual from 'deep-equal'
import {UiState} from '~/src/business/UiState'
import styles from './style.less'

@observer
export class Oscilloscope extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (!this.context.uiState.currentContextStore) {
      return null
    }

    let logLines = []

    const hack = this.context.uiState.currentContextStore.getEngine().probesHack + 1
    const data = this.context.uiState.currentContextStore.getEngine().probesData

    let min = this.context.uiState.currentContextStore.getEngine().currentTick

    Object.keys(data).forEach(name=>{
      data[name].forEach(item=>{
        min = Math.min(min, item.tick)
      })
    })

    const ticks = []

    for (let i=this.context.uiState.currentContextStore.getEngine().currentTick;i>=min;--i) {
      ticks.push(i)
    }

    return <table className={styles.main}>
      <thead>
        <tr>
          <th>Probe/tick</th>
          {ticks.map((tick, i)=><th key={i}>{tick}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(data).map(name=>this.renderRow(ticks, name, data[name]))
        }
      </tbody>
    </table>
  }

  renderRow(ticks, name, data) {
    const cells = []

    let dataIndex = -1
    let currentData = undefined

    for (let i = ticks.length-1;i>=0;--i) {
      let change = false

      if (dataIndex+1<data.length) {
        if (data[dataIndex+1].tick===ticks[i]) {
          dataIndex = dataIndex + 1
          change = true
          currentData = data[dataIndex]
        }
      }

      if (currentData) {
        cells.unshift(<td title={name} key={i} className={change ? styles.change : styles.same}>{currentData.value}</td>)
      } else {
        cells.unshift(<td title={name} key={i} className={styles.undefined}></td>)
      }
    }

    return <tr key={name}>
      <td>{name}</td>
      {cells}
    </tr>
  }
}
