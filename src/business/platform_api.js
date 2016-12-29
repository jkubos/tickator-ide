import {Validate} from '~/src/util/validate'

export class PlatformApi {

  constructor() {
    this.onTickHandlers = []
  }

  setTick(tick) {
    Validate.isNumber(tick)

    this.onTickHandlers.forEach(h=>h(tick))
  }

  onTick(handler) {
    this.onTickHandlers.push(handler)
  }

}
