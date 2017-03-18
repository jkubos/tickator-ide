import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class WaitForAll extends Ticklet {

  static define(b) {
    b.klass(WaitForAll)

    b.comment("Signalize that there is input from all input sources")

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

    b.size(70, 70)
  }

  initialize() {
    this._set = new Set()
    this._signalized = false
  }

  tick() {
    if (this.in().reset().isTriggering()) {
      this._set.clear()
      this._signalized = false
    } else if (!this._signalized) {
      this.in().value().outputs().filter(o=>o.isTriggering()).forEach(o=>this._set.add(o))

      if (this.in().value().outputs().length==this._set.size) {
        this._signalized = true
        this.out().done().set(true)
      }
    }
  }
}
