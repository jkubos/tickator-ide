import Ticklet from '~/src/tickator/instance/ticklet'
import Validate from '~/src/util/validate'

export default class Dispatcher {
  constructor() {
    this.currentTick = 0
    this.scheduled = []
    this.logLines = []
  }

  log(message) {
    this.logLines.push({
      tick: this.currentTick,
      message
    })
  }

  schedule(ticklet) {
    Validate.isA(ticklet, Ticklet)
    Validate.notContained(this.scheduled, ticklet)

    this.scheduled.push(ticklet)
  }

  doTick() {
    if (this.scheduled.length<=0) {
      return
    }

    this.toProcess = this.scheduled
    this.scheduled = []

    this.log('----------------------------------------')

    this.toProcess.forEach(ticklet=>{
      try {
        ticklet.tick()
      } catch (e) {
        console.error("Problem occurred during tick of %o", ticklet)
        throw e
      }
    })

    ++this.currentTick
  }
}
