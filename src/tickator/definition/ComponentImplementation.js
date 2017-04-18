import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {InterfaceDefinition} from './InterfaceDefinition'
import {InterfaceUsage} from './InterfaceUsage'
import {TypeDefinition} from './TypeDefinition'

export class ComponentImplementation {

  static create(businessSpace) {
    Validate.isA(businessSpace, BusinessSpace)

    const businessObject = new BusinessObject(businessSpace, 'ComponentImplementation')
    businessObject.setProperty("name", "default")

    return new ComponentImplementation(businessObject)
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

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'type')
  }

  get businessObject() {
    return this._businessObject
  }

  addType() {
    const goodName = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'].find(name=>{
      return this.refsType.every(type=>type.name!==name)
    })

    const type = TypeDefinition.create(this.businessObject.space, goodName || "new")
    this._businessObject.addRef("type", type.businessObject)
  }
}
