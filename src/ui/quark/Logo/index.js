import React from 'react'
import styles from './style.less'

export class Logo extends React.Component {

  render() {
    return <div className={styles.main}>
      <a href="http://www.tickator.org/" target="_blank">Tickator IDE 0.0.1</a>
    </div>
  }
}
