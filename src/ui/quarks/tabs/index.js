import React from 'react'
import styles from './style.less'

export class Tabs extends React.Component {

  static propTypes = {
    tabsName: React.PropTypes.string.isRequired,
    defaultTab: React.PropTypes.string.isRequired
  }

  static childContextTypes = {
    tabsName: React.PropTypes.string.isRequired,
    defaultTab: React.PropTypes.string.isRequired
  }

  getChildContext() {
    return {
      tabsName: this.props.tabsName,
      defaultTab: this.props.defaultTab
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
