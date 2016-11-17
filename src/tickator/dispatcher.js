import Ticklet from '~/src/tickator/instance/ticklet'
import Output from '~/src/tickator/instance/output'
import Validate from '~/src/util/validate'

export default class Dispatcher {
  constructor() {
    this.reset()
  }

  reset() {
    this._currentTick = 0
    this._changedOutputs = []
    this._scheduledTicklets = []
    this._logLines = []
  }

  currentTick() {
    return this._currentTick
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

  schedule(ticklet) {
    Validate.isA(ticklet, Ticklet)
    Validate.notContained(this._scheduledTicklets, ticklet)

    this._scheduledTicklets.push(ticklet)
  }

  markChangedOutput(output) {
    Validate.isA(output, Output)
    Validate.notContained(this._changedOutputs, output)

    this._changedOutputs.push(output)
  }

  doTick() {
    if (this._changedOutputs.length<=0 && this._scheduledTicklets.length<=0) {
      return
    }

    this._toProcess = this._scheduledTicklets

    this._changedOutputs.forEach(output=>{
      output.depending().forEach(input=>{
        this._toProcess.push(input.ticklet())
      })
    })

    this._toProcess = [...new Set(this._toProcess)]

    this._scheduledTicklets = []
    this._changedOutputs = []

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
