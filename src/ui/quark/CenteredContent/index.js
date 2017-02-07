import React from 'react'
import classNames from 'classnames'
import styles from './style.less'

export class CenteredContent extends React.Component {

  render() {
    return <div className={styles.main}>
      {this.props.children}
    </div>
  }
}
