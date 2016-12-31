import {Validate} from '~/src/util/validate'

export class PlatformApi {

  constructor() {
    this.onTickHandlers = []
    this.onLogHandlers = []
  }

  setTick(tick) {
    Validate.isNumber(tick)

    this.onTickHandlers.forEach(h=>h(tick))
  }

  onTick(handler) {
    this.onTickHandlers.push(handler)
  }

  log(msg) {
    this.onLogHandlers.forEach(h=>h(msg))
  }

  onLog(handler) {
    this.onLogHandlers.push(handler)
  }
}
