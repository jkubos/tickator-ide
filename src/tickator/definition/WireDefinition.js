import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {InterfaceDefinition} from './InterfaceDefinition'
import {TypeDefinition} from './TypeDefinition'

import {DataTypes} from '~/src/tickator/DataTypes'

export class WireDefinition {

  static create(interfaceDef) {
    Validate.isA(interfaceDef, InterfaceDefinition)
    Validate.isA(interfaceDef.businessObject, BusinessObject)

    const businessObject = new BusinessObject(interfaceDef.businessObject.space, 'WireDefinition')
    const res = new WireDefinition(businessObject)

    businessObject.addRef("interfaceDefinition", interfaceDef)
    businessObject.setProperty('name', interfaceDef.makeNameUnique('new'))
    businessObject.setProperty('direction', 'in')
    businessObject.setProperty('basicType', 'ANY')

    return res
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

      if (this.basicType!==undefined && this.refType!==undefined) {
        this._businessObject.addPropertyProblem('type', 'Either type or basic type must be set, both are')
      }

      if (this.basicType===undefined && this.refType===undefined) {
        this._businessObject.addPropertyProblem('type', 'Either type or basic type must be set, none is')
      }

      if (this.basicType!==undefined && DataTypes[this.basicType]===undefined) {
        this._businessObject.addPropertyProblem('basicType', 'Unknown type')
      }
    })

    BusinessObject.definePropertyAccessors(this, this._businessObject, 'name')
    BusinessObject.definePropertyAccessors(this, this._businessObject, 'direction')

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'interfaceDefinition')
  }

  get businessObject() {
    return this._businessObject
  }

  delete() {
    this._businessObject.delete()
  }

  clone() {
    const wire = WireDefinition.create(this.refInterfaceDefinition)
    wire.name = this.refInterfaceDefinition.makeNameUnique(this.name)
    wire.direction = this.direction

    if (this.refType) {
      wire.refType = this.refType
    } else {
      wire.basicType = this.basicType
    }
  }

  get basicType() {
    return this._businessObject.getProperty('basicType')
  }

  set basicType(type) {
    Validate.valid(DataTypes[type]!==undefined)

    this._businessObject.setProperty('basicType', type)
    this._businessObject.removeRef('type')
  }

  get refType() {
    const refs = this._businessObject.getRefs('type')

    if (refs.length>0) {
      Validate.ofSize(refs, 1)

      return refs[0]
    } else {
      return undefined
    }
  }

  set refType(type) {
    Validate.isA(type, TypeDefinition)

    this._businessObject.setProperty('basicType', undefined)
    this._businessObject.addRef('type', type)
  }

  hasValidType() {
    return this.basicType!==undefined ^ this.refType!==undefined
  }
}
