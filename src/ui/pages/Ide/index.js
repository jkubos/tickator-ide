import React from 'react'
import {observer} from 'mobx-react'

const jQuery = require('jquery/dist/jquery.min')

import styles from './style.less'

import {UiState} from '~/src/business/UiState'

import {MainToolbar} from '~/src/ui/molecules/MainToolbar'

import {Tabs} from '~/src/ui/quarks/Tabs'
import {TabHeader} from '~/src/ui/quarks/TabHeader'
import {TabContent} from '~/src/ui/quarks/TabContent'

import {ComponentSchema} from '~/src/ui/molecules/ComponentSchema'
import {ConsoleView} from '~/src/ui/atoms/ConsoleView'
import {InputLine} from '~/src/ui/atoms/InputLine'
import {PropertiesView} from '~/src/ui/atoms/PropertiesView'
import {ComponentsList} from '~/src/ui/atoms/ComponentsList'
import {Oscilloscope} from '~/src/ui/atoms/Oscilloscope'

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

      <div className={styles.propertiesBar}>
        <PropertiesView/>
      </div>

      <div className={styles.bottomBar}>
        <Tabs tabsName='bottom' defaultTab='console'>
          <TabHeader name='console' title='Console'/>
          <TabContent for='console'>
            <InputLine />
            <ConsoleView />
          </TabContent>

          <TabHeader name='oscilloscope' title='Oscilloscope' />
          <TabContent for='oscilloscope'>
            <Oscilloscope />
          </TabContent>
        </Tabs>
      </div>

    </div>
  }
}
