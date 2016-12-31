import React from 'react'
import styles from './style.less'
import {Tools} from '~/src/util/tools'

export class Tabs extends React.Component {

  static propTypes = {
    tabsName: React.PropTypes.string.isRequired,
    defaultTab: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  }

  static childContextTypes = {
    tabsName: React.PropTypes.string.isRequired,
    defaultTab: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  }

  getChildContext() {
    return {
      tabsName: this.props.tabsName,
      defaultTab: this.props.defaultTab,
      onChange: this.props.onChange
    }
  }

  render() {
    const children = Tools.flatten(this.props.children)

    return <div className={styles.main}>
      <div className={styles.headers}>
        {children.filter(c=>c.type.name=='TabHeader')}
      </div>

      <div className={styles.contents}>
        {children.filter(c=>c.type.name=='TabContent')}
      </div>
    </div>
  }
}
