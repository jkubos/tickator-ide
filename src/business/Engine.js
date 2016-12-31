import {observable} from 'mobx'
import {Validate} from '~/src/util/validate'

import {Component} from '~/src/tickator/instance/component'
import {Dispatcher} from '~/src/tickator/dispatcher'
import {InstanceDefinitionBuilder} from '~/src/tickator/definition/instance_definition_builder'
import {PlatformApi} from './PlatformApi'
import {Definitions} from './Definitions'

export class Engine {
  @observable isRunning = false
  @observable currentTick = 0
  @observable logLines = []

  constructor(definitions, component) {
    Validate.isA(definitions, Definitions)
    Validate.notBlank(component)

    this._definitions = definitions

    this._platformApi = new PlatformApi()

    this._platformApi.onTick(tick=>this.currentTick=tick)
    this._platformApi.onLog(log=>{
      this.logLines.push({tick: this.currentTick, message: log})

      if (this.logLines.length>100) {
        this.logLines = this.logLines.slice(-100)
      }
    })

    this._component = component

    this._load()
  }

  getPlatformApi() {
    return this._platformApi
  }

  run() {
    Validate.valid(!this.isRunning, "Engine is running already!")

    this.isRunning = true

    this._intervalId = window.setInterval(()=>{
      this._doStep()
    }, 0)
  }

  pause() {
    Validate.valid(this.isRunning, "Engine is not running!")

    this._stop()
  }

  step() {
    Validate.valid(!this.isRunning, "Engine is running already!")
    this._doStep()
  }

  reset() {
    this._stop()
    this.logLines = []
    this._load()
  }

  _load() {
    this._dispatcher = new Dispatcher(this._platformApi)

    const instanceDefinitionBuilder = new InstanceDefinitionBuilder(
      this._definitions.getTickletsRepository(),
      this._definitions.getComponentsRepository()
    )

    instanceDefinitionBuilder.name('runtime root')
    instanceDefinitionBuilder.component(this._component)

    const instanceDefinition = instanceDefinitionBuilder.build()

    this._rootInstance = new Component(this._dispatcher, instanceDefinition)
    this._rootInstance.build()
    this._rootInstance.wireUp()
  }

  _stop() {
    if (this._intervalId!==undefined) {
      window.clearInterval(this._intervalId)
      this._intervalId = undefined
    }

    this.isRunning = false
  }

  _doStep() {
    this._dispatcher.doTick()
  }
}
