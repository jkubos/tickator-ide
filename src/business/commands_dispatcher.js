import Validate from '~/src/util/validate'

export default class CommandsDispatcher {
  constructor() {
    this._handlers = {}
  }

  register(cmd, handler) {
    Validate.notBlank(cmd)
    Validate.isFunctionWithArity(handler, 1)

    if (!this._handlers[cmd]) {
      this._handlers[cmd] = []
    }

    this._handlers[cmd].push(handler)
  }

  dispatch(cmd, data={}) {

    console.log(cmd, data)

    Validate.notBlank(cmd)
    Validate.notNull(data)

    if (this._handlers[cmd]) {
      this._handlers[cmd].forEach(handler=>handler(data))
    }
  }
}
