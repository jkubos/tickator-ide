import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {ComponentDefinition} from './ComponentDefinition'

export class ComponentUsage {

  static create(componentDefinition, x, y) {
    Validate.isA(componentDefinition, ComponentDefinition)

    const businessObject = new BusinessObject(componentDefinition.businessObject.space, 'ComponentUsage')
    businessObject.setProperty("name", componentDefinition.name)
    businessObject.setProperty("x", x)
    businessObject.setProperty("y", y)
    businessObject.addRef("componentDefinition", componentDefinition.businessObject)

    return new ComponentUsage(businessObject)
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
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'x')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'y')

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'componentDefinition')
  }

  get businessObject() {
    return this._businessObject
  }

  delete() {
    this._businessObject.delete()
  }
}
