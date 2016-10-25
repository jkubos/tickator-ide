export default class Dispatcher {
  constructor() {
    this.currentTick = 0
    this.toProcess = []
  }

  doTick() {
    if (this.toProcess.length<=0) {
      return
    }

    console.log(`---------------[TICK ${this.currentTick}]---------------`)
    
    ++this.currentTick
  }
}
