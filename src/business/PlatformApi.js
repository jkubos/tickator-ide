import {Validate} from '~/src/util/Validate'

export class PlatformApi {

  constructor() {
    this.onTickHandlers = []
    this.onLogHandlers = []
    this.onInputHandlers = []
    this.onProbeChangeHandlers = []
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

  input(str) {
    this.onInputHandlers.forEach(h=>h(str))
  }

  onInput(handler) {
    this.onInputHandlers.push(handler)
  }

  probeChange(name, oldValue, value) {
    this.onProbeChangeHandlers.forEach(h=>h(name, oldValue, value))
  }

  onProbeChange(handler) {
    this.onProbeChangeHandlers.push(handler)
  }
}
