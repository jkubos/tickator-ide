import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class Countdown extends Ticklet {

  static define(b) {
    b.klass(Countdown)

    b.comment("Decrement value and signalize zero")

    b.input(b=>{
      b.name("value")
      b.position('left', 0.7)
    })

    b.output(b=>{
      b.name("done")
      b.position('right', 0.7)
    })

    b.input(b=>{
      b.name("reset")
      b.position('bottom', 0.5)
    })

    b.property(b=>{
      b.name('value')
    })

    b.size(70, 70)
  }

  initialize() {
    this._value = this.properties().value()
  }

  tick() {
    if (this.in().reset().isTriggering()) {
      this._value = this.properties().value()
    } else {
      this.in().value().outputs().filter(o=>o.isTriggering()).forEach(output=>this._value = this._value - 1)

      if (this._value<=0) {
        this.out().done().set(true)
      }
    }
  }
}
