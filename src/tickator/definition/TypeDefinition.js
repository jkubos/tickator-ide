import {Validate} from '~/src/util/Validate'
import {BusinessObject} from '~/src/business/BusinessObject'

export class TypeDefinition {

  static create(name) {
    Validate.notBlank(name)

    const businessObject = new BusinessObject('TypeDefinition')
    businessObject.setProperty("name", name)

    return new TypeDefinition(businessObject)
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
  }

  get businessObject() {
    return this._businessObject
  }

  delete() {
    this._businessObject.delete()
  }
}
