import React from 'react'
import styles from './style.less'

export default class Tabs extends React.Component {

  static childContextTypes = {
    selectedTab: React.PropTypes.string.isRequired
  }

  getChildContext() {
    return {
      selectedTab: this.props.selectedTab
    }
  }

  render() {
    return <div className={styles.main}>
      <div className={styles.headers}>
        {this.props.children.filter(c=>c.type.name=='TabHeader')}
      </div>

      <div className={styles.contents}>
        {this.props.children.filter(c=>c.type.name=='TabContent')}
      </div>
    </div>
  }
}
