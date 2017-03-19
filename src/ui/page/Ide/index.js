import React from 'react'
import {observer} from 'mobx-react'

const jQuery = require('jquery/dist/jquery.min')

import styles from './style.less'

import {UiState} from '~/src/business/UiState'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'

import {Connector} from '~/src/connector/Connector'

import {MainToolbar} from '~/src/ui/molecule/MainToolbar'
import {Content} from '~/src/ui/molecule/Content'

import {TextInputDialog} from '~/src/ui/atom/TextInputDialog'
import {SelectionInputDialog} from '~/src/ui/atom/SelectionInputDialog'
import {ContextMenu} from '~/src/ui/atom/ContextMenu'

@observer
export class IDE extends React.Component {

  static propTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  static childContextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    test: React.PropTypes.instanceOf(InterfaceDefinition).isRequired
  }

  constructor() {
    super()

    jQuery(window).resize(e=>{
      this.onResize()
    })

    jQuery(window).keyup(e=>{
      this.onKeyUp(e)
    })

    this.test = InterfaceDefinition.create()
    this.test.addType()
    this.test.addWire()
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      test: this.test
    }
  }

  componentDidMount() {
    this.onResize()
  }

  onResize() {
    this.props.uiState.updateContentSize(jQuery("#main_schema").width(), jQuery("#main_schema").height())
  }

  onKeyUp(e) {
    this.props.uiState.onKeyUp(e)
  }

  render() {
    return <div className={styles.main}>
      <TextInputDialog/>
      <SelectionInputDialog/>
      <ContextMenu/>

      <MainToolbar/>
      <Content/>
    </div>
  }

  _renderSandbox() {
    return <div className={styles.sandbox}>
      <div>{this.props.uiState.selectedScreen}:{this.props.uiState.selectedUuid}</div>

      {this.props.uiState.getDefinitions().getConnectorsRepository().all.map(c=>{
        return <div>
          {c.name}[{c.uuid}]
          &nbsp;
          <button onClick={e=>c.name='karel'}>Rename!</button>
        </div>
      })}
    </div>
  }

  _onAdd() {
    const connector = new Connector()

    this.props.uiState.getDefinitions().getConnectorsRepository().add(connector)
  }
}
