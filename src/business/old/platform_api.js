import Validate from '~/src/util/validate'

export class PlatformApi {
  constructor() {
    this._currentTick = 0;
    this._logLines = []

    this._onUserInputLine = []
  }

  setTick(tick) {
    if (tick<this._currentTick) {
      this._logLines = []
    }

    this._currentTick = tick
  }

  log(message) {
    const toRemove = this._logLines.length-100

    if (toRemove>0) {
      this._logLines.splice(0, toRemove)
    }

    this._logLines.push({
      tick: this._currentTick,
      message
    })
  }

  logLines() {
    return this._logLines.slice(0)
  }

  emitUserInputLine(value) {
    this._onUserInputLine.forEach(callback=>callback(value))
  }

  registerOnUserInputLine(callback) {
    Validate.isFunctionWithArity(callback, 1)
    this._onUserInputLine.push(callback)
  }
}
