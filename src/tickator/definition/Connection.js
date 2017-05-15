import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {InterfaceUsage} from './InterfaceUsage'

export class Connection {

  static create(space, from, to) {
    Validate.isA(space, BusinessSpace)
    Validate.isA(from, InterfaceUsage)
    Validate.isA(to, InterfaceUsage)

    const businessObject = new BusinessObject(space, 'Connection')
    const res = new Connection(businessObject)

    businessObject.bulkChange(()=>{
      businessObject.addRef('from', from.businessObject)
      businessObject.addRef('to', to.businessObject)
    })

    return res
  }

  constructor(businessObject) {
    Validate.notNull(businessObject)

    this._businessObject = businessObject
    this._businessObject.owner = this
    this._businessObject.addValidator(()=>{
      if (!this.hasSingleRefFrom) {
        this._businessObject.addPropertyProblem('from', 'Not set')
      }

      if (!this.hasSingleRefTo) {
        this._businessObject.addPropertyProblem('to', 'Not set')
      }
    })

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'from')
    BusinessObject.defineRefsAccessors(this, this._businessObject, 'to')
  }

  get businessObject() {
    return this._businessObject
  }
}
