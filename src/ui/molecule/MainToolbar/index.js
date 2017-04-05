import React from 'react'
import {observer} from 'mobx-react'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Screens} from '~/src/business/Screens'
import {Modals} from '~/src/business/Modals'

import {Toolbar} from '~/src/ui/quark/Toolbar'
import {ToolbarButton} from '~/src/ui/quark/ToolbarButton'
import {ToolbarSeparator} from '~/src/ui/quark/ToolbarSeparator'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'
import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'

@observer
export class MainToolbar extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    return <Toolbar>
      <ToolbarButton icon='fa-floppy-o' label='Save changes' disabled={false} onClick={e=>this._save()} />
      <ToolbarButton icon='fa-archive' label='Export data' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-trash' label='Drop changes' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-arrows-alt' label='Fullscreen' disabled={false} onClick={e=>this._fullscreen()} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-plus' label='Add' disabled={false} onClick={e=>this._onAdd()} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-search' label='Search' disabled={false} onClick={e=>this._openSearch()} />
      <ToolbarButton icon='fa-heart' label='Favorites' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-sign-in' label='Entry points' disabled={false} onClick={e=>{}} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-sitemap' label='Hierarchy' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-arrow-left' label='Previously seen' disabled={!this._canNavigatePrevious()} onClick={e=>this._navigatePrevious()} />
      <ToolbarButton icon='fa-history' label='Last seen' disabled={false} onClick={e=>{this._openHistory()}} />
      <ToolbarButton icon='fa-arrow-right' label='Next seen' disabled={!this._canNavigateNext()} onClick={e=>this._navigateNext()} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-play' label='Run' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-pause' label='Pause' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-step-forward' label='Step' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-stop' label='Stop' disabled={false} onClick={e=>{}} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-question' label='Help' disabled={false} onClick={e=>this._help()} />
    </Toolbar>
  }

  _onAdd() {
    this.context.uiState.navigate(Screens.SELECT_ADDED_ELEMENT_TYPE)
  }

  _navigatePrevious() {
    this.context.uiState.navigatePrevious()
  }

  _navigateNext() {
    this.context.uiState.navigateNext()
  }

  _canNavigateNext() {
    return this.context.uiState.canNavigateNext
  }

  _canNavigatePrevious() {
    return this.context.uiState.canNavigatePrevious
  }

  _help() {
    this.context.uiState.navigate(Screens.HELP)
  }

  _openHistory() {
    this.context.uiState.navigate(Screens.HISTORY)
  }

  _openSearch() {
    this.context.uiState.openModal(Modals.SELECT_OBJECT_MODAL, {}, e=>{
      if (e.confirmed) {

        const o = this.context.space.get(e.uuid).owner

        if (o instanceof InterfaceDefinition) {
          this.context.uiState.navigate(Screens.INTERFACE_FORM, {uuid: e.uuid})
        } else if (o instanceof ComponentDefinition) {
          this.context.uiState.navigate(Screens.COMPONENT_FORM, {uuid: e.uuid})
        } else {
            alert('Cannot open this object!')
        }
      }
    })
  }

  _fullscreen() {
    if (!document.webkitFullscreenElement) {
      document.documentElement.webkitRequestFullscreen()
    } else {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  _save() {
    this.context.space.save()
  }
}
