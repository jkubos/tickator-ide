import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {InterfaceDefinition} from './InterfaceDefinition'

export class InterfaceUsage {

  static create(interfaceDefinition) {
    Validate.isA(interfaceDefinition, InterfaceDefinition)

    const businessObject = new BusinessObject(interfaceDefinition.businessObject.space, 'InterfaceUsage')
    businessObject.setProperty("name", "new interface")
    businessObject.setProperty("side", "left")
    businessObject.setProperty("sideRatio", 0.5)
    businessObject.addRef("interfaceDefinition", interfaceDefinition.businessObject)

    return new InterfaceUsage(businessObject)
  }

  constructor(businessObject) {
    Validate.notNull(businessObject)

    this._businessObject = businessObject
    this._businessObject.owner = this
    this._businessObject.addValidator(()=>{
      if (!this.name) {
        this._businessObject.addPropertyProblem('name', 'Name must not be blank')
      }

      if (!['top', 'left', 'bottom', 'right'].includes(this.side)) {
        this._businessObject.addPropertyProblem('side', `Unknown side '${this.side}'`)
      }
    })

    BusinessObject.definePropertyAccessors(this, this._businessObject, 'name')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'side')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'sideRatio')
    
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'definitionSide')

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'interfaceDefinition')
  }

  get businessObject() {
    return this._businessObject
  }

  delete() {
    this._businessObject.delete()
  }
}
