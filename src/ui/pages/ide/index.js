import React from 'react'
import {observer} from 'mobx-react'

const jQuery = require('jquery/dist/jquery.min')

import styles from './style.less'

import {UiState} from '~/src/business/UiState'

import {MainToolbar} from '~/src/ui/molecules/main_toolbar'

import {Tabs} from '~/src/ui/quarks/tabs'
import {TabHeader} from '~/src/ui/quarks/tab_header'
import {TabContent} from '~/src/ui/quarks/tab_content'

import {ComponentSchema} from '~/src/ui/molecules/component_schema'
import {ConsoleView} from '~/src/ui/atoms/console_view'
// import {InputLine} from '~/src/ui/atoms/input_line'
// import {PropertiesView} from '~/src/ui/atoms/properties_view'
import {ComponentsList} from '~/src/ui/atoms/components_list'

@observer
export class IDE extends React.Component {

  static propTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  static childContextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  constructor() {
    super()

    jQuery(window).resize(e=>{
      this.onResize()
    })
  }

  getChildContext() {
    return {
      uiState: this.props.uiState
    }
  }

  componentDidMount() {
    this.onResize()
  }

  onResize() {
    this.props.uiState.updateContentSize(jQuery("#main_schema").width(), jQuery("#main_schema").height())
  }

  render() {
    const contextStores = this.props.uiState.contextStores

    return <div className={styles.main}>

      <div className={styles.toolBar}>
        <MainToolbar/>
      </div>

      <div className={styles.contentBar}>

        <div className={styles.treeBar}>

          <ComponentsList
           engine={this.props.engine}
           commandsDispatcher={this.props.commandsDispatcher}/>

        {/*
        <PropertiesView
          instance={this.props.engine.rootInstance()}
          selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
        /> */}

        </div>

        <div id="main_schema" className={styles.mainContentBar}>
          <Tabs
            tabsName='content'
            defaultTab={contextStores.length>0 ? contextStores[0].getUuid() : ''}
            onChange={name=>this.props.uiState.selectContextStore(name)}>
            {
              contextStores.map(context=>{
                return <TabHeader name={context.getUuid()} title={context.getLabel()} key={context.getUuid()}/>
              })
            }

            {
              contextStores.map(context=>{
                return <TabContent for={context.getUuid()} key={context.getUuid()}>
                    <ComponentSchema
                      instance={context.getEngine().getRootComponent()}
                      width={this.props.uiState.width}
                      height={this.props.uiState.height-25}
                      selectedInstanceName={''}
                      povInstancePath={[]}
                    />
                </TabContent>
              })
            }
          </Tabs>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <Tabs tabsName='bottom' defaultTab='console'>
          <TabHeader name='console' title='Console'/>
          <TabContent for='console'>
            {/* <InputLine /> */}
            <ConsoleView />
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
