import React from 'react'
import {observer} from 'mobx-react'

const jQuery = require('jquery/dist/jquery.min')

import styles from './style.less'

import {UiState} from '~/src/business/ui_state'
import {Engine} from '~/src/business/engine'
import {Definitions} from '~/src/business/definitions'

import {MainToolbar} from '~/src/ui/molecules/main_toolbar'

import {Tabs} from '~/src/ui/quarks/tabs'
import {TabHeader} from '~/src/ui/quarks/tab_header'
import {TabContent} from '~/src/ui/quarks/tab_content'

// import {ComponentSchema} from '~/src/ui/molecules/component_schema'
// import {ConsoleView} from '~/src/ui/atoms/console_view'
// import {InputLine} from '~/src/ui/atoms/input_line'
// import {PropertiesView} from '~/src/ui/atoms/properties_view'
// import {ComponentsList} from '~/src/ui/atoms/components_list'
//
// import UiStore from './ui_store'



@observer
export class IDE extends React.Component {

  static propTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    definitions: React.PropTypes.instanceOf(Definitions).isRequired,
    engine: React.PropTypes.instanceOf(Engine).isRequired
  }

  static childContextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    definitions: React.PropTypes.instanceOf(Definitions).isRequired,
    engine: React.PropTypes.instanceOf(Engine).isRequired
  }

  constructor() {
    super()
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      definitions: this.props.definitions,
      engine: this.props.engine
    }
  }

  componentDidMount() {
    this.props.uiState.updateContentSize(jQuery("#main_schema").width(), jQuery("#main_schema").height())
  }

  render() {
    // const logLines = this.props.uiState.get('engine', 'logLines')

    return <div className={styles.main}>

      <div className={styles.toolBar}>
        <MainToolbar/>
      </div>

      <div className={styles.contentBar}>

        <div className={styles.treeBar}>

        {/* <ComponentsList
          engine={this.props.engine}
          commandsDispatcher={this.props.commandsDispatcher}/>

        <PropertiesView
          instance={this.props.engine.rootInstance()}
          selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
        /> */}

        </div>

        <div id="main_schema" className={styles.mainContentBar}>
          {/* <ComponentSchema
            instance={this.props.engine.rootInstance()}
            width={this._uiStore.contentWidth}
            height={this._uiStore.contentHeight}
            selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
            povInstancePath={this.props.uiState.get('ui', 'povInstancePath')}
          /> */}
        </div>

      </div>

      <div className={styles.bottomBar}>
        <Tabs tabsName={'bottom'} defaultTab={'console'}>
          <TabHeader name='console' title='Console'/>
          <TabContent for='console'>
            {/* <InputLine />
            <ConsoleView lines={logLines} /> */}
            xxx
          </TabContent>

          <TabHeader name='oscilloscope' title='Oscilloscope' />
          <TabContent for='oscilloscope'>
            osciloskop
          </TabContent>
        </Tabs>
      </div>

    </div>
  }
}
