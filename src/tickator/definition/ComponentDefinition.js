import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {InterfaceDefinition} from './InterfaceDefinition'
import {InterfaceUsage} from './InterfaceUsage'

export class ComponentDefinition {

  static create(businessSpace) {
    Validate.isA(businessSpace, BusinessSpace)

    const businessObject = new BusinessObject(businessSpace, 'ComponentDefinition')
    businessObject.setProperty("name", "new component")

    return new ComponentDefinition(businessObject)
  }

  constructor(businessObject) {
    Validate.notNull(businessObject)

    this._businessObject = businessObject
    this._businessObject.owner = this
    this._businessObject.addValidator(()=>{
      if (!this.name) {
        this._businessObject.addPropertyProblem('name', 'Name must not be blank')
      }
    })

    BusinessObject.definePropertyAccessors(this, this._businessObject, 'name')

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'implementation')
    BusinessObject.defineRefsAccessors(this, this._businessObject, 'interfaceUsage')
  }

  get businessObject() {
    return this._businessObject
  }

  addIterface(interfaceDefinition, side, sideRatio) {
    Validate.isA(interfaceDefinition, InterfaceDefinition)

    const interfaceUsage = InterfaceUsage.create(interfaceDefinition)
    interfaceUsage.side = side
    interfaceUsage.sideRatio = sideRatio
        
    this.businessObject.addRef('interfaceUsage', interfaceUsage.businessObject)
  }
}
