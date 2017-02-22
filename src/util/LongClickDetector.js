import {Validate} from './Validate'

export class LongClickDetector {
  constructor(handler) {
    Validate.notNull(handler)
    this._handler = handler
    this._timeout = undefined
  }

  start(e) {
    if (e.button===0) {
      this._timeout = setTimeout(()=>this._handler(), 200)
    }
  }

  stop() {
    if (this._timeout!==undefined) {
      clearTimeout(this._timeout)
      this._timeout = undefined
    }
  }
}
