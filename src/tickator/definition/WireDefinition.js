import {Validate} from '~/src/util/Validate'
import {BusinessObject} from '~/src/business/BusinessObject'
import {InterfaceDefinition} from './InterfaceDefinition'

export class WireDefinition {

  static create(interfaceDef) {
    Validate.isA(interfaceDef, InterfaceDefinition)
    Validate.isA(interfaceDef.businessObject, BusinessObject)

    const businessObject = new BusinessObject('WireDefinition')
    businessObject.addRef("interfaceDefinition", interfaceDef)
    businessObject.setProperty('name', 'new')
    businessObject.setProperty('direction', 'in')
    businessObject.setProperty('type', 'any')

    return new WireDefinition(businessObject)
  }

  constructor(businessObject) {
    Validate.notNull(businessObject)

    this._businessObject = businessObject
    this._businessObject.owner = this
    this._businessObject.addValidator(()=>{
      if (!this.name) {
        this._businessObject.addPropertyProblem('name', 'Name must not be blank')
      }

      if (!['in', 'out'].includes(this.direction)) {
        this._businessObject.addPropertyProblem('direction', 'Direction must be either in or out')
      }
    })

    BusinessObject.definePropertyAccessors(this, this._businessObject, 'name')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'direction')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'type')
  }

  get businessObject() {
    return this._businessObject
  }

  delete() {
    this._businessObject.delete()
  }

  clone() {

  }
}
