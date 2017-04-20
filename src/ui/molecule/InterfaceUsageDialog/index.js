import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'
import {Screens} from '~/src/business/Screens'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {DataTypes} from '~/src/tickator/DataTypes'

@observer
export class InterfaceUsageDialog extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.INTERFACE_USAGE_DIALOG) {
      return null;
    }

    const params = this.context.uiState.openedModalParams

    const interfaceUsage = params.interfaceUsage
    const componentImplementation = params.componentImplementation
    const interfaceDefinition = interfaceUsage.refInterfaceDefinition
    const interfaceSide = params.interfaceUsage.definitionSide ? interfaceDefinition.definitionSideName : interfaceDefinition.otherSideName

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
        <div>
          <div><strong>Name</strong>: {params.interfaceUsage.name}</div>
          <div><strong>Type</strong>: {interfaceDefinition.name}</div>
          <div><strong>Side</strong>: {interfaceSide}</div>
          <br/>
          {interfaceDefinition.refsType.length>0 && <div>
              <strong>Types:</strong>
              <br/><br/>
              {interfaceDefinition.refsType.map((type, i)=><div key={i}>
                {type.name} : {this._renderTypeParamValue(componentImplementation, type, interfaceUsage)}
              </div>)}
            </div>
          }
          <br/>
          <ImageButton glyph='fa-exchange' label='Switch side' huge
            onClick={e=>params.interfaceUsage.definitionSide = !params.interfaceUsage.definitionSide} />
            <br/>
            <ImageButton glyph='fa-trash' label='Delete' huge onClick={e=>params.interfaceUsage.delete()} />
            <br/>
            <ImageButton glyph='fa-exchange' label='Open definition' huge onClick={e=>this._openDefinition(params.interfaceUsage.refInterfaceDefinition)} />
        </div>
    </div>
  }

  _onSelect(e, uuid) {
    this.context.uiState.closeModal({confirmed: true, uuid})
    e.stopPropagation()
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()
  }

  _openDefinition(interfaceDefinition) {
    this.context.uiState.closeModal({confirmed: false})
    this.context.uiState.navigate(Screens.INTERFACE_FORM, {uuid: interfaceDefinition.businessObject.uuid})
  }

  _renderTypeParamValue(componentImplementation, type, interfaceUsage) {
    const typeAssignment = componentImplementation.findTypeAssignment(interfaceUsage, type)

    let val = "???"

    if (typeAssignment) {
      if (typeAssignment.basicType) {
        val = typeAssignment.basicType
      } else if (typeAssignment.refType) {
        val = typeAssignment.refType.name
      }
    }

    return <span onClick={e=>this._editType(e, componentImplementation, type, interfaceUsage)}>{val}</span>
  }

  _editType(e, componentImplementation, type, interfaceUsage) {
    e.stopPropagation()

    const typeAssignment = componentImplementation.assureTypeAssignment(interfaceUsage, type)

    let options = [];

    options = options.concat(componentImplementation.refsType.map(t=>{
        return {
          label: t.name,
          value: {type: t}
        }
    }))

    if (options.length>0) {
      options = options.concat({separator: true})
    }

    options = options.concat(Object.keys(DataTypes).map(t=>{
      return {
        label: DataTypes[t],
        value: {basicType: t}
      }
    }))

    this.context.uiState.openModal(Modals.CHOICE_MODAL, {options}, e=>{
      if (e.confirmed) {
        if (e.value.type) {
          typeAssignment.refType = e.value.type
        } else {
          typeAssignment.basicType = e.value.basicType
        }
      }
    })
  }
}
