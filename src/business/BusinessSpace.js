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

  get(uuid) {
    Validate.isSet(this._objects, uuid)

    return this._objects[uuid]
  }

  remove(object) {
    Validate.isA(object, BusinessObject)
    Validate.isSet(this._objects, object.uuid)

    delete this._objects[object.uuid]
  }

  save() {
    localStorage.clear()

    Object.keys(this._objects).forEach(uuid=>{
      localStorage.setItem(uuid, this._objects[uuid].toJson());
    })
  }

  load() {
    for(var key in localStorage) {
      const obj = JSON.parse(localStorage[key])

      const businessObject = BusinessObject.fromJson(this, obj)
      this.add(businessObject)
    }

    for(var key in localStorage) {
      const obj = JSON.parse(localStorage[key])

      this.get(obj.uuid).loadRefs(obj)
    }
  }
}
