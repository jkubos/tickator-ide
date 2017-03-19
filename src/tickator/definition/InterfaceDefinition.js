import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {TypeDefinition} from './TypeDefinition'
import {WireDefinition} from './WireDefinition'

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
        this._businessObject.addPropertyProblem('name', 'Name must not be blank')
      }

      if (!this.definitionSideName) {
        this._businessObject.addPropertyProblem('definitionSideName', 'Side name must not be blank')
      }

      if (!this.otherSideName) {
        this._businessObject.addPropertyProblem('otherSideName', 'Side name must not be blank')
      }

      if (this.definitionSideName===this.otherSideName) {
        this._businessObject.addPropertyProblem('otherSideName', "Side names must not be equal")
      }

      if (this.wires.length<1) {
        this._businessObject.addPropertyProblem('wires', "There must be at least one wire in interface")
      }

      if (this.wires.length!==(new Set(this.wires.map(w=>w.name))).size) {
        this._businessObject.addPropertyProblem('wires', "Wire names duplicity")
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

  addWire() {
    WireDefinition.create(this)
  }

  get wires() {
    return this._businessObject.findBackRefs(WireDefinition)
  }

  makeNameUnique(name) {
    const isUniq = (n)=>this.wires.every(w=>w.name!==n)

    if (isUniq(name)) {
      return name
    } else {
      const groups = (/(.*?)[0-9]+/g).exec(name)
      const nameWithoutNumber = groups && groups.length>1 ? groups[1] : name

      for (let i=1;;++i) {
        if (isUniq(nameWithoutNumber+i)) {
          return nameWithoutNumber+i
        }
      }
    }
  }
}
