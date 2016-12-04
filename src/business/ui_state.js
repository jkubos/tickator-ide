import Validate from '~/src/util/validate'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {
  ENGINE_STATE,
  ON_TICK_DONE,
  DISPATCHER_LOGS_CHANGED,
  SELECT_INSTANCE
} from '~/src/business/commands/commands'

export default class UiState {
  constructor(commandsDispatcher, render) {
    Validate.isA(commandsDispatcher, CommandsDispatcher)
    Validate.isFunctionWithArity(render, 0)

    this._commandsDispatcher = commandsDispatcher
    this._render = render

    this._data = {}
    this._renderPlanned = false

    this._update('ui', 'selectedInstanceName', '')

    this._commandsDispatcher.register(ON_TICK_DONE, data=>this._onTickDone(data.currentTick))
    this._commandsDispatcher.register(ENGINE_STATE, data=>this._onEngineStateChange(data.state))
    this._commandsDispatcher.register(DISPATCHER_LOGS_CHANGED, data=>this._onDispatcherLogsChange(data.lines))
    this._commandsDispatcher.register(SELECT_INSTANCE, data=>this._onInstanceSelected(data.instance))
  }

  get(...path) {
    Validate.notEmpty(path)
    let res = this._data

    path.forEach(key=>{
      if (res!==undefined && res!==null) {
        res = res[key]
      }
    })

    return res
  }

  _onTickDone(currentTick) {
    this._update('engine', 'currentTick', currentTick)
  }

  _onEngineStateChange(state) {
    this._update('engine', 'state', state)
  }

  _onDispatcherLogsChange(lines) {
    this._update('engine', 'logLines', lines)
  }

  _onInstanceSelected(instanceName) {
    this._update('ui', 'selectedInstanceName', instanceName)
  }

  _update(...path) {
    Validate.notEmpty(path)

    const value = path.pop()

    Validate.notEmpty(path)

    if (this.get(path)!==value) {

      let act = this._data

      path.forEach((key, i)=>{
        if (i==path.length-1) {
          act[key] = value
        } else {
          if (act[key]==undefined) {
            act[key] = {}
          }

          act = act[key]
        }
      })

      this._planRender()
    }
  }

  _planRender() {
    if (!this._renderPlanned) {
      this._renderPlanned = true
      window.setTimeout(()=>{
        this._renderPlanned = false
        this._render()
      }, 0)
    }
  }
}
