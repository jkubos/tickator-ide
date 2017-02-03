import {observable} from 'mobx'
import Validate from '~/src/util/Validate'
import {TickletRepository} from '~/src/tickator/definition/TickletRepository'
import {ComponentRepository} from '~/src/tickator/definition/ComponentRepository'
import {ticklets} from '~/src/tickator/ticklets/index'
import {ConnectorsRepository} from '~/src/connector/ConnectorsRepository'

export class Definitions {
  @observable isRunning = false

  constructor() {
    this._tickletRepository = new TickletRepository()
    ticklets.forEach(t=>this._tickletRepository.add(t))

    this._connectorsRepository = new ConnectorsRepository()

    this._componentRepository = new ComponentRepository(this._tickletRepository)
    this._componentRepository.addAll([])
  }

  getTickletsRepository() {
    return this._tickletRepository
  }

  getComponentsRepository() {
    return this._componentRepository
  }

  getConnectorsRepository() {
    return this._connectorsRepository
  }
}
