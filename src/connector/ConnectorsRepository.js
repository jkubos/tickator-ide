import {observable, computed} from 'mobx'
import {Validate} from '~/src/util/Validate'
import {Connector} from './Connector'

export class ConnectorsRepository {
  _connectors = new Map()

  @observable _changeNr = 0

  @computed get all() {

    const trick = this._changeNr

    const res = []

    this._connectors.forEach((val, key)=>{
      res.push(val)
    })

    return res
  }

  add(connector) {
    Validate.isA(connector, Connector)
    Validate.valid(!this._connectors.has(connector.uuid))

    this._connectors.set(connector.uuid, connector)

    ++this._changeNr
  }
}
