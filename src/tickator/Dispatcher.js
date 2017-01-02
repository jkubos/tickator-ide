import {Ticklet} from '~/src/tickator/instance/Ticklet'
import {Output} from '~/src/tickator/instance/Output'
import {Validate} from '~/src/util/Validate'
import {PlatformApi} from '~/src/business/PlatformApi'

export class Dispatcher {
  constructor(platformApi) {
    Validate.isA(platformApi, PlatformApi)

    this._platformApi = platformApi
    this.reset()
  }

  getPlatformApi() {
    return this._platformApi
  }

  reset() {
    this._currentTick = 0
    this._platformApi.setTick(this._currentTick)

    this._changedOutputs = []
    this._scheduledTicklets = []
  }

  currentTick() {
    return this._currentTick
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

    this._platformApi.log('----------------------------------------')

    this._toProcess.forEach(ticklet=>{
      try {
        ticklet.tick()
      } catch (e) {
        console.error("Problem occurred during tick of %o", ticklet)
        throw e
      }
    })

    ++this._currentTick
    this._platformApi.setTick(this._currentTick)
  }
}
