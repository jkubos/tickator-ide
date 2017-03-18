import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {TypeDefinition} from './TypeDefinition'

export class InterfaceDefinition {

  static create() {
    const businessObject = new BusinessObject('InterfaceDefinition')
    businessObject.setProperty("name", "new interface")
    businessObject.setProperty("definitionSideName", "side1")
    businessObject.setProperty("otherSideName", "side2")

    return new InterfaceDefinition(businessObject)
  }

  constructor(businessObject) {
    Validate.notNull(businessObject)

    this._businessObject = businessObject
    this._businessObject.owner = this
    this._businessObject.addValidator(()=>{
      if (!this.name) {
        this._businessObject.addPropertyProblem('name', "uplne naprd")
      }

      if (!this.definitionSideName) {
        this._businessObject.addPropertyProblem('definitionSideName', "uplne naprd")
      }

      if (!this.otherSideName) {
        this._businessObject.addPropertyProblem('otherSideName', "uplne naprd")
      }
    })

    BusinessObject.definePropertyAccessors(this, this._businessObject, 'name')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'definitionSideName')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'otherSideName')

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'type')
  }

  get businessObject() {
    return this._businessObject
  }

  addType() {
    const goodName = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'].find(name=>{
      return this.refsType.every(type=>type.name!==name)
    })
    
    const type = TypeDefinition.create(goodName || "new")
    this._businessObject.addRef("type", type)
  }
}
