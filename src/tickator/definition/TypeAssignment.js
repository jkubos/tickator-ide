import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {InterfaceDefinition} from './InterfaceDefinition'
import {InterfaceUsage} from './InterfaceUsage'
import {TypeDefinition} from './TypeDefinition'

import {DataTypes} from '~/src/tickator/DataTypes'

export class TypeAssignment {

  static create(space, typeRef, contextRef) {
    Validate.isA(space, BusinessSpace)
    Validate.isA(typeRef, TypeDefinition)
    Validate.isA(contextRef.businessObject, BusinessObject)

    const businessObject = new BusinessObject(space, 'TypeAssignment')
    const res = new TypeAssignment(businessObject)

    businessObject.setProperty('basicType', 'ANY')

    businessObject.addRef('targetType', typeRef.businessObject)
    businessObject.addRef('context', contextRef.businessObject)

    return res
  }

  constructor(businessObject) {
    Validate.notNull(businessObject)

    this._businessObject = businessObject
    this._businessObject.owner = this
    this._businessObject.addValidator(()=>{
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

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'targetType')
    BusinessObject.defineRefsAccessors(this, this._businessObject, 'context')
  }

  get businessObject() {
    return this._businessObject
  }

  get basicType() {
    return this._businessObject.getProperty('basicType')
  }

  set basicType(type) {
    Validate.valid(DataTypes[type]!==undefined)

    this._businessObject.setProperty('basicType', type)
    this._businessObject.removeRef('refType')
  }

  get refType() {
    const refs = this._businessObject.getRefs('refType')

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
    this._businessObject.addRef('refType', type.businessObject)
  }

  hasValidType() {
    return this.basicType!==undefined ^ this.refType!==undefined
  }
}
