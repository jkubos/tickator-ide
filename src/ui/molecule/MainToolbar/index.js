import React from 'react'
import {observer} from 'mobx-react'
import {UiState} from '~/src/business/UiState'
import {Screens} from '~/src/business/Screens'

import {Toolbar} from '~/src/ui/quark/Toolbar'
import {ToolbarButton} from '~/src/ui/quark/ToolbarButton'
import {ToolbarSeparator} from '~/src/ui/quark/ToolbarSeparator'

@observer
export class MainToolbar extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <Toolbar>
      <ToolbarButton icon='fa-floppy-o' label='Save changes' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-archive' label='Export data' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-trash' label='Drop changes' disabled={false} onClick={e=>{}} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-plus' label='Add' disabled={false} onClick={e=>this._onAdd()} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-search' label='Search' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-heart' label='Favorites' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-sign-in' label='Entry points' disabled={false} onClick={e=>{}} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-sitemap' label='Hierarchy' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-arrow-left' label='Previously seen' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-history' label='Last seen' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-arrow-right' label='Next seen' disabled={false} onClick={e=>{}} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-play' label='Run' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-pause' label='Pause' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-step-forward' label='Step' disabled={false} onClick={e=>{}} />
      <ToolbarButton icon='fa-stop' label='Stop' disabled={false} onClick={e=>{}} />

      <ToolbarSeparator/>

      <ToolbarButton icon='fa-question' label='Help' disabled={false} onClick={e=>{}} />

    </Toolbar>
  }

  _onAdd() {
    this.context.uiState.navigate(Screens.SELECT_ADDED_ELEMENT_TYPE)
  }
}
