import React from 'react'
import ComponentSchema from '~/src/ui/component/graphic/component_schema'
import ConsoleView from '~/src/ui/ide/console_view'
import InputLine from '~/src/ui/ide/input_line'
import ComponentsList from '~/src/ui/ide/components_list'
import PropertiesView from '~/src/ui/ide/properties_view'
import Toolbar from '~/src/ui/ide/toolbar'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'
import Engine from '~/src/business/engine'
import Breadcrumb from '~/src/ui/ide/breadcrumb'
import Tabs from '~/src/ui/ide/tabs'
import TabHeader from '~/src/ui/ide/tab_header'
import TabContent from '~/src/ui/ide/tab_content'

export default class TickatorIDE extends React.Component {

  render() {
    const logLines = this.props.uiState.get('engine', 'logLines')

    return <div>

      <div className='toolBar'></div>

      <div className='contentBar'></div>

      <div className='bottomBar'></div>


      {/*

      <div className="container container-full">
        <Toolbar/>

        <div className="row">
          <div className="col-lg-3">
            <div className="panel panel-default">
              <div className="panel-body">
                <ComponentsList />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="panel panel-default">
              <div className="panel-body">
                <Breadcrumb
                  povInstancePath={this.props.uiState.get('ui', 'povInstancePath')}
                />
                <ComponentSchema
                  instance={this.props.engine.rootInstance()}
                  width={900}
                  height={500}
                  selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
                  povInstancePath={this.props.uiState.get('ui', 'povInstancePath')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <div className="panel panel-default">
              <div className="panel-body">
                <PropertiesView
                  instance={this.props.engine.rootInstance()}
                  selectedInstanceName={this.props.uiState.get('ui', 'selectedInstanceName')}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <Tabs id="tools" selectedTab='console'>
              <TabHeader name="console" label="Console"/>
              <TabContent for="console">
                <InputLine />
                <ConsoleView lines={logLines} />
              </TabContent>

              <TabHeader name="oscilloscope" label="Oscilloscope"/>
              <TabContent for="oscilloscope">
                zzz
              </TabContent>
            </Tabs>


          </div>
        </div>
      </div>*/}
    </div>
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      commandsDispatcher: this.props.commandsDispatcher,
      engine: this.props.engine
    }
  }
}

TickatorIDE.propTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
  engine: React.PropTypes.instanceOf(Engine).isRequired
}

TickatorIDE.childContextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
  engine: React.PropTypes.instanceOf(Engine).isRequired
}
