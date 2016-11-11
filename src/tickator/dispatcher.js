import Ticklet from '~/src/tickator/instance/ticklet'
import Validate from '~/src/util/validate'

export default class Dispatcher {
  constructor() {
    this._currentTick = 0
    this._scheduled = []
    this._logLines = []
  }

  currentTick() {
    return this._currentTick
  }

  log(message) {
    this._logLines.push({
      tick: this._currentTick,
      message
    })
  }

  logLines() {
    return this._logLines.slice(0)
  }

  schedule(ticklet) {
    Validate.isA(ticklet, Ticklet)
    Validate.notContained(this._scheduled, ticklet)

    this._scheduled.push(ticklet)
  }

  doTick() {
    if (this._scheduled.length<=0) {
      return
    }

    this._toProcess = this._scheduled
    this._scheduled = []

    this.log('----------------------------------------')

    this._toProcess.forEach(ticklet=>{
      try {
        ticklet.tick()
      } catch (e) {
        console.error("Problem occurred during tick of %o", ticklet)
        throw e
      }
    })

    ++this._currentTick
  }
}
