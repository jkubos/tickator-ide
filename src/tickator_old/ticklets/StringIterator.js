import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class StringIterator extends Ticklet {

  static define(b) {
    b.klass(StringIterator)

    b.comment("Decompose string to characters")

    b.input(b=>{
      b.name("value")
      b.position('left', 0.7)
    })

    b.input(b=>{
      b.name("next")
      b.position('bottom', 0.5)
    })

    b.output(b=>{
      b.name("character")
      b.position('right', 0.7)
    })

    b.size(90, 70)
  }

  initialize() {
    this._shouldSend = true
  }

  tick() {
    this._value = this._value || ''

    if (this.in().value().isTriggering()) {
      this._value = this._value + this.in().value().get()
    }

    if (this.in().next().isTriggering() || this._shouldSend) {
      this._shouldSend = false

      if (this._value.length>0) {
        this.out().character().set(this._value[0])
        this._value = this._value.slice(1)
      } else {
        this._shouldSend = true
      }
    }
  }
}
