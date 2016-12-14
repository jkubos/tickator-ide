import React from 'react'
import styles from './style.less'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'
import Engine from '~/src/business/engine'

import MainToolbar from '~/src/ui/molecules/main_toolbar'

import Tabs from '~/src/ui/quarks/tabs'
import TabHeader from '~/src/ui/quarks/tab_header'
import TabContent from '~/src/ui/quarks/tab_content'

import {ComponentSchema} from '~/src/ui/molecules/component_schema'
import {ConsoleView} from '~/src/ui/atoms/console_view'
import {InputLine} from '~/src/ui/atoms/input_line'
import {PropertiesView} from '~/src/ui/atoms/properties_view'
import {ComponentsList} from '~/src/ui/atoms/components_list'

import UiStore from './ui_store'

import {observer} from 'mobx-react'

@observer
export default class TickatorIDE extends React.Component {

  static propTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
    engine: React.PropTypes.instanceOf(Engine).isRequired
  }

  static childContextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
    engine: React.PropTypes.instanceOf(Engine).isRequired,
    uiStore: React.PropTypes.instanceOf(UiStore).isRequired
  }

  constructor() {
    super()
    this._uiStore = new UiStore()
  }

  componentDidMount() {
    this._uiStore.updateContentSize($("#main_schema").width(), $("#main_schema").height())
  }

  render() {
    const logLines = this.props.uiState.get('engine', 'logLines')

    return <div className={styles.main}>

      <div className={styles.toolBar}>
        <MainToolbar/>
      </div>

      <div className={styles.contentBar}>

        <div className={styles.treeBar}>

        <ComponentsList
          engine={this.props.engine}
          commandsDispatcher={this.props.commandsDispatcher}/>

        <PropertiesView
          instance={this.props.engine.rootInstance()}
          selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
        />
        
        </div>

        <div id="main_schema" className={styles.mainContentBar}>
          <ComponentSchema
            instance={this.props.engine.rootInstance()}
            width={this._uiStore.contentWidth}
            height={this._uiStore.contentHeight}
            selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
            povInstancePath={this.props.uiState.get('ui', 'povInstancePath')}
          />
        </div>

      </div>

      <div className={styles.bottomBar}>
        <Tabs selectedTab={this._uiStore.selectedBottomTab}>
          <TabHeader name='console' title='Console'/>
          <TabContent for='console'>
            <InputLine />
            <ConsoleView lines={logLines} />
          </TabContent>

          <TabHeader name='oscilloscope' title='Oscilloscope' />
          <TabContent for='oscilloscope'>
            osciloskop
          </TabContent>
        </Tabs>
      </div>

    </div>
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      commandsDispatcher: this.props.commandsDispatcher,
      engine: this.props.engine,
      uiStore: this._uiStore
    }
  }
}
