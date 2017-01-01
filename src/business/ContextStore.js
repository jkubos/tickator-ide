import {observable} from 'mobx'
import {Validate} from '~/src/util/validate'
import {Definitions} from '~/src/business/Definitions'
import {Engine} from '~/src/business/Engine'
import {Tools} from '~/src/util/tools'

export class ContextStore {

  @observable selectedInstanceName = undefined
  @observable displayedComponentPath = []

  constructor(definitions, rootComponent) {
    Validate.isA(definitions, Definitions)

    this._definitions = definitions
    this._engine = new Engine(definitions, rootComponent)

    this._uuid = Tools.generateUUID()
  }

  getUuid() {
    return this._uuid
  }

  getLabel() {
    return this._engine.getRootComponent().definition().name()
  }

  getEngine() {
    return this._engine
  }

  getDisplayedInstance() {
    let res = this._engine.getRootComponent()

    this.displayedComponentPath.forEach(name=>{
      res = res._findInstance(name)
    })

    return res
  }

  getSelectedInstance() {
    let res = this.getDisplayedInstance()

    if (this.selectedInstanceName!==undefined) {
      res = res._findInstance(this.selectedInstanceName)
    }

    return res
  }

  selectInstance(instanceName) {
    this.selectedInstanceName = instanceName
  }

  drillDown(instanceName) {
    this.selectedInstanceName = undefined
    this.displayedComponentPath.push(instanceName)
  }

  rollUp(instanceName) {
    this.selectedInstanceName = undefined
    this.displayedComponentPath.pop()
  }
}
