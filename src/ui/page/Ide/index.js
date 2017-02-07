import React from 'react'
import {observer} from 'mobx-react'

const jQuery = require('jquery/dist/jquery.min')

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Connector} from '~/src/connector/Connector'

import {MainToolbar} from '~/src/ui/molecule/MainToolbar'
import {Content} from '~/src/ui/molecule/Content'
import {TextInputDialog} from '~/src/ui/atom/TextInputDialog'

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
      <TextInputDialog/>

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
