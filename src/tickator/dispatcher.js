import {sleep} from '~/src/util/tools'

export default class Dispatcher {
  constructor() {
    this.currentTick = 0
    this.toProcess = []
    this.logLines = []
  }

  log(message) {
    this.logLines.push({
      tick: this.currentTick,
      message
    })
  }

  doTick() {
    if (this.toProcess.length<=0 && this.currentTick>100) {
      return
    }

    this.log(`Loool`)

    ++this.currentTick
  }
}
