import {observable, computed} from 'mobx'
import {Validate} from '~/src/util/Validate'
import {Tools} from '~/src/util/Tools'

export class Connector {

  @observable name = ""

  constructor(data) {
    if (data) {
      Validate.never("")
    } else {
      this._uuid = Tools.generateUUID()
      this._name = name
      this._pins
    }
  }

  get uuid() {
    return this._uuid
  }

  @computed get pins() {
    return this._pins
  }
}
