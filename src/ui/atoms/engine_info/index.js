import React from 'react'
import styles from './style.less'
import {Engine} from '~/src/business/engine'

export class EngineInfo extends React.Component {
  static contextTypes = {
    engine: React.PropTypes.instanceOf(Engine).isRequired
  }

  render() {
    return <div className={styles.main}>
      Current tick: {this.context.engine.tick}
    </div>
  }

}
