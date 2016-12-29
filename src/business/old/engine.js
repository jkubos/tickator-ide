

import {
  ON_TICK_DONE,
  ENGINE_RUN,
  ENGINE_PAUSE,
  ENGINE_STEP,
  ENGINE_STATE,
  ENGINE_RESET,
  DISPATCHER_LOGS_CHANGED,
  ENGINE_LOAD_COMPONENT,
  USER_INPUT_LINE
} from '~/src/business/commands/commands'
import {
  ENGINE_STATE_RUNNING,
  ENGINE_STATE_PAUSED
} from '~/src/business/consts'
import Validate from '~/src/util/validate'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import InstanceDefinitionBuilder from '~/src/tickator/definition/instance_definition_builder'
import PlatformApi from './platform_api'

export class Engine {
  constructor(commandsDispatcher) {
    Validate.isA(commandsDispatcher, CommandsDispatcher)

    this._commandsDispatcher = commandsDispatcher

    this._platformApi = new PlatformApi()

    this._dispatcher = new Dispatcher(this._platformApi)

    this._tickletRepository = new TickletRepository()
    ticklets.forEach(t=>this._tickletRepository.add(t))

    this._componentRepository = new ComponentRepository(this._tickletRepository)
    this._componentRepository.addAll(components)

    this._commandsDispatcher.register(ENGINE_RUN, (data)=>this._runEngine())
    this._commandsDispatcher.register(ENGINE_PAUSE, (data)=>this._pauseEngine())
    this._commandsDispatcher.register(ENGINE_STEP, (data)=>this._stepEngine())
    this._commandsDispatcher.register(ENGINE_RESET, (data)=>this._resetEngine())
    this._commandsDispatcher.register(ENGINE_LOAD_COMPONENT, (data)=>this._loadComponent(data.name))
    this._commandsDispatcher.register(USER_INPUT_LINE, (data)=>this._userInputLine(data.value))

    this._intervalId = undefined
    this._selectedComponent = undefined
  }

  init() {
    this._resetEngine()
  }

  rootInstance() {
    return this._rootInstance
  }

  componentRepository() {
    return this._componentRepository
  }

  dispatcher() {
    return this._dispatcher
  }

  _buildRootInstance() {
    if (!this._selectedComponent) {
      return
    }

    const instanceDefinitionBuilder = new InstanceDefinitionBuilder(this._tickletRepository,
      this._componentRepository)

    instanceDefinitionBuilder.name('runtime root')
    instanceDefinitionBuilder.component(this._selectedComponent)

    //instanceDefinitionBuilder.property('test', 42)

    const instanceDefinition = instanceDefinitionBuilder.build()

    this._rootInstance = new Component(this._dispatcher, instanceDefinition)
    this._rootInstance.build()
    this._rootInstance.wireUp()
  }

  _runEngine() {
    Validate.valid(this._intervalId===undefined, "Engine is already running, cannot run it again!")

    this._intervalId = window.setInterval(()=>{
      this._doStep()
    }, 0)

    this._commandsDispatcher.dispatch(ENGINE_STATE, {
      state: ENGINE_STATE_RUNNING
    })
  }

  _pauseEngine() {
    Validate.valid(this._intervalId!==undefined, "Engine not running, cannot pause it!")
    window.clearInterval(this._intervalId)
    this._intervalId = undefined

    this._commandsDispatcher.dispatch(ENGINE_STATE, {
      state: ENGINE_STATE_PAUSED
    })
  }

  _stepEngine() {
    Validate.valid(this._intervalId===undefined, "Engine is running, cannot step it!")
    this._doStep()
  }

  _resetEngine() {
    if (this._intervalId!==undefined) {
      this._pauseEngine()
    }

    this._dispatcher.reset()
    this._buildRootInstance()

    this._commandsDispatcher.dispatch(ON_TICK_DONE, {
      currentTick: this._dispatcher.currentTick()
    })

    this._commandsDispatcher.dispatch(ENGINE_STATE, {
      state: ENGINE_STATE_PAUSED
    })

    this._commandsDispatcher.dispatch(DISPATCHER_LOGS_CHANGED, {
      lines: this._platformApi.logLines()
    })
  }

  _loadComponent(name) {
    this._selectedComponent = name
    this._resetEngine()
  }

  _doStep() {
    this._dispatcher.doTick()
    this._commandsDispatcher.dispatch(ON_TICK_DONE, {
      currentTick: this._dispatcher.currentTick()
    })

    this._commandsDispatcher.dispatch(DISPATCHER_LOGS_CHANGED, {
      lines: this._platformApi.logLines()
    })
  }

  _userInputLine(value) {
    this._platformApi.emitUserInputLine(value)
  }
}
