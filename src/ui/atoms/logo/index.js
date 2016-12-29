import React from 'react'
import styles from './style.less'

export class Logo extends React.Component {

  render() {
    return <div className={styles.main}>
      <img src='/favicon.png'/>

      Tickator IDE
    </div>
  }

}
