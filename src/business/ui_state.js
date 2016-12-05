import Validate from '~/src/util/validate'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {
  ENGINE_STATE,
  ON_TICK_DONE,
  DISPATCHER_LOGS_CHANGED,
  SELECT_INSTANCE,
  ENGINE_LOAD_COMPONENT,
  DIVE_INTO_INSTANCE,
  EMERGE_FROM_INSTANCE
} from '~/src/business/commands/commands'
import hashed from 'hashed'

export default class UiState {
  constructor(commandsDispatcher, render) {
    Validate.isA(commandsDispatcher, CommandsDispatcher)
    Validate.isFunctionWithArity(render, 0)

    this._commandsDispatcher = commandsDispatcher
    this._render = render

    this._data = {}
    this._renderPlanned = false

    this._update('ui', 'selectedInstanceName', '')
    this._update('ui', 'povInstancePath', [])

    this._commandsDispatcher.register(ON_TICK_DONE, data=>this._onTickDone(data.currentTick))
    this._commandsDispatcher.register(ENGINE_STATE, data=>this._onEngineStateChange(data.state))
    this._commandsDispatcher.register(DISPATCHER_LOGS_CHANGED, data=>this._onDispatcherLogsChange(data.lines))
    this._commandsDispatcher.register(SELECT_INSTANCE, data=>this._onInstanceSelected(data.instance))
    this._commandsDispatcher.register(DIVE_INTO_INSTANCE, data=>this._onDivedIntoInstance(data.instance))
    this._commandsDispatcher.register(EMERGE_FROM_INSTANCE, data=>this._onEmergeFromInstance())
    this._commandsDispatcher.register(ENGINE_LOAD_COMPONENT, data=>this._onComponentLoad(data.name))

    this._initializeFromHash()
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

  _initializeFromHash() {
    this._urlState = {
      component: 'SimpleSum'
    }

    if (location.hash && location.hash.length>1) {
      const hashObj = JSON.parse(decodeURIComponent(location.hash.substring(1)))
      this._urlState = Object.assign(this._urlState, hashObj)
    }

    this._commandsDispatcher.dispatch(ENGINE_LOAD_COMPONENT, {name: this._urlState.component})
  }

  _onComponentLoad(name) {
    if (this._urlState.component!=name) {
      this._urlState.component = name
      location.hash = encodeURIComponent(JSON.stringify(this._urlState))
    }

    this._update('ui', 'selectedInstanceName', '')
    this._update('ui', 'povInstancePath', [])
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

  _onDivedIntoInstance(instanceName) {
    this._update('ui', 'selectedInstanceName', '')
    this._update('ui', 'povInstancePath', [...this.get('ui', 'povInstancePath'), instanceName])
  }

  _onEmergeFromInstance() {
    this._update('ui', 'selectedInstanceName', '')
    this._update('ui', 'povInstancePath', this.get('ui', 'povInstancePath').slice(1))
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
