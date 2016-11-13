import TickletRepository from '~/src/tickator/definition/ticklet_repository'
import ComponentRepository from '~/src/tickator/definition/component_repository'
import {ticklets} from '~/src/tickator/ticklets/index'
import {components} from '~/src/components/index'
import Component from '~/src/tickator/instance/component'
import Dispatcher from '~/src/tickator/dispatcher'
import {ON_TICK_DONE, ENGINE_RUN, ENGINE_PAUSE, ENGINE_STEP} from '~/src/business/commands/commands'
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

    this._rootInstance = new Component(this._dispatcher, this._componentRepository.get('Root'))
    this._rootInstance.build()

    this._commandsDispatcher.register(ENGINE_RUN, (data)=>this._runEngine())
    this._commandsDispatcher.register(ENGINE_PAUSE, (data)=>this._pauseEngine())
    this._commandsDispatcher.register(ENGINE_STEP, (data)=>this._stepEngine())

    this._intervalId = undefined
  }

  rootInstance() {
    return this._rootInstance
  }

  dispatcher() {
    return this._dispatcher
  }

  _runEngine() {
    Validate.valid(this._intervalId===undefined, "Engine is already running, cannot run it again!")

    this._intervalId = window.setInterval(()=>{
      this._doStep()
    }, 0)
  }

  _pauseEngine() {
    Validate.valid(this._intervalId!==undefined, "Engine not running, cannot pause it!")
    window.clearInterval(this._intervalId)
    this._intervalId = undefined
  }

  _stepEngine() {
    Validate.valid(this._intervalId===undefined, "Engine is running, cannot step it!")
    this._doStep()
  }

  _doStep() {
    this._dispatcher.doTick()
    this._commandsDispatcher.dispatch(ON_TICK_DONE, {
      currentTick: this._dispatcher.currentTick()
    })
  }
}
