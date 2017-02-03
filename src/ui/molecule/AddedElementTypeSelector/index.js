import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'

import {Button} from '~/src/ui/quark/Button'

export class AddedElementTypeSelector extends React.Component {
  render() {
    return <div className={styles.main}>
      <h1>What should be added?</h1>

      <div className={styles.buttons}>
        <Button label="Connector" huge={true}/>
        <Button label="Component" huge={true}/>
      </div>

    </div>
  }
}
