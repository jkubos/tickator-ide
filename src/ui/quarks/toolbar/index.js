import React from 'react'
import styles from './style.less'

export default class Toolbar extends React.Component {

  render() {
    return <div className={styles.main}>
      {this.props.children}
    </div>
  }

}
