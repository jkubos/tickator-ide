import TickletRepository from '~/src/tickator/definition/ticklet_repository'
import ComponentRepository from '~/src/tickator/definition/component_repository'
import {ticklets} from '~/src/tickator/ticklets/index'
import {components} from '~/src/components/index'
import Component from '~/src/tickator/instance/component'
import Dispatcher from '~/src/tickator/dispatcher'
import {
  ON_TICK_DONE,
  ENGINE_RUN,
  ENGINE_PAUSE,
  ENGINE_STEP,
  ENGINE_STATE,
  ENGINE_RESET,
  DISPATCHER_LOGS_CHANGED,
  ENGINE_LOAD_COMPONENT
} from '~/src/business/commands/commands'
import {
  ENGINE_STATE_RUNNING,
  ENGINE_STATE_PAUSED
} from '~/src/business/consts'
import Validate from '~/src/util/validate'
import CommandsDispatcher from '~/src/business/commands_dispatcher'

export default class Engine {
  constructor(commandsDispatcher) {
    Validate.isA(commandsDispatcher, CommandsDispatcher)

    this._commandsDispatcher = commandsDispatcher

    this._dispatcher = new Dispatcher()

    this._tickletRepository = new TickletRepository()
    ticklets.forEach(t=>this._tickletRepository.add(t))

    this._componentRepository = new ComponentRepository(this._tickletRepository)
    this._componentRepository.addAll(components)

    this._commandsDispatcher.register(ENGINE_RUN, (data)=>this._runEngine())
    this._commandsDispatcher.register(ENGINE_PAUSE, (data)=>this._pauseEngine())
    this._commandsDispatcher.register(ENGINE_STEP, (data)=>this._stepEngine())
    this._commandsDispatcher.register(ENGINE_RESET, (data)=>this._resetEngine())
    this._commandsDispatcher.register(ENGINE_LOAD_COMPONENT, (data)=>this._loadComponent(data.name))

    this._intervalId = undefined
    this._selectedComponent = 'Root'
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
    this._rootInstance = new Component(this._dispatcher, this._componentRepository.get(this._selectedComponent))
    this._rootInstance.build()
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
      lines: this._dispatcher.logLines()
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
      lines: this._dispatcher.logLines()
    })
  }
}
