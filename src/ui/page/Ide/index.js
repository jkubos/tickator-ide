import React from 'react'
import {observer} from 'mobx-react'

const jQuery = require('jquery/dist/jquery.min')

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Screens} from '~/src/business/Screens'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {Connector} from '~/src/connector/Connector'

import {MainToolbar} from '~/src/ui/molecule/MainToolbar'
import {Content} from '~/src/ui/molecule/Content'

import {TextInputDialog} from '~/src/ui/atom/TextInputDialog'
import {SelectionInputDialog} from '~/src/ui/atom/SelectionInputDialog'
import {SelectObjectDialog} from '~/src/ui/atom/SelectObjectDialog'
import {ContextMenu} from '~/src/ui/atom/ContextMenu'
import {InterfaceUsageDialog} from '~/src/ui/molecule/InterfaceUsageDialog'
import {FavoritesDialog} from '~/src/ui/atom/FavoritesDialog'

@observer
export class IDE extends React.Component {

  static propTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  static childContextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  constructor(props) {
    super(props)

    jQuery(window).resize(e=>{
      this.onResize()
    })

    jQuery(window).keyup(e=>{
      this.onKeyUp(e)
    })

    jQuery(window).mouseup(e=>{
      this.onMouseUp(e)
    })

    this.props.space.load()
    this.props.uiState.init()
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      space: this.props.space
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

  onMouseUp(e) {
    this.props.uiState.onMouseUp(e)
  }

  render() {
    return <div className={styles.main}>
      <TextInputDialog/>
      <SelectionInputDialog/>
      <SelectObjectDialog/>
      <ContextMenu/>
      <InterfaceUsageDialog/>
      <FavoritesDialog/>

      <MainToolbar/>
      <Content/>
    </div>
  }

  _onAdd() {
    const connector = new Connector()

    this.props.uiState.getDefinitions().getConnectorsRepository().add(connector)
  }
}
