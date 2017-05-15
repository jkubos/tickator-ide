import {Validate} from '~/src/util/Validate'

import {BusinessObject} from '~/src/business/BusinessObject'
import {BusinessSpace} from '~/src/business/BusinessSpace'

import {Connection} from './Connection'

export class ConnectionsLayer {

  static create(businessSpace) {
    Validate.isA(businessSpace, BusinessSpace)

    const businessObject = new BusinessObject(businessSpace, 'ConnectionsLayer')
    businessObject.setProperty("name", "default")

    return new ConnectionsLayer(businessObject)
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

    BusinessObject.defineRefsAccessors(this, this._businessObject, 'connectionsLayer', 'componentImplementation')
    BusinessObject.defineRefsAccessors(this, this._businessObject, 'connection')
  }

  get businessObject() {
    return this._businessObject
  }

  createConnection(from, to) {
    let connection = Connection.create(this.businessObject.space, from, to)

    this.businessObject.addRef('connection', connection.businessObject)
  }
}
