import {observable} from 'mobx'
import {Validate} from '~/src/util/validate'


import {Component} from '~/src/tickator/instance/component'
import {Dispatcher} from '~/src/tickator/dispatcher'
import {InstanceDefinitionBuilder} from '~/src/tickator/definition/instance_definition_builder'
import {PlatformApi} from './platform_api'
import {Definitions} from './definitions'

export class Engine {
  @observable isRunning = false
  @observable currentTick = 0

  constructor(definitions) {
    Validate.isA(definitions, Definitions)

    this._platformApi = new PlatformApi()

    this._dispatcher = new Dispatcher(this._platformApi)
  }

  run() {
    Validate.valid(!this.isRunning, "Engine is running already!")
  }

  pause() {
    Validate.valid(this.isRunning, "Engine is not running!")
  }

  step() {
    Validate.valid(!this.isRunning, "Engine is running already!")
  }

  reset() {

  }
}
