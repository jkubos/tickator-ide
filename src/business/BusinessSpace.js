import {observable} from 'mobx'

import {Validate} from '~/src/util/Validate'
import {Tools} from '~/src/util/Tools'

import {BusinessObject} from './BusinessObject'

export class BusinessSpace {
  _objects = {}

  add(object) {
    Validate.isA(object, BusinessObject)
    Validate.notSet(this._objects, object)

    this._objects[object.uuid] = object
  }

  remove(object) {
    Validate.isA(object, BusinessObject)
    Validate.isSet(this._objects, object)

    delete this._objects[object.uuid]
  }
}
