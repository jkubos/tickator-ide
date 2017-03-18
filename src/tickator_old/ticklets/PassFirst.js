import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class PassFirst extends Ticklet {

  static define(b) {
    b.klass(PassFirst)

    b.comment("Let pass first value")

    b.input(b=>{
      b.name("value")
      b.position('left', 0.7)
    })

    b.output(b=>{
      b.name("res")
      b.position('right', 0.7)
    })

    b.input(b=>{
      b.name("reset")
      b.position('bottom', 0.5)
    })

    b.size(70, 70)
  }

  initialize() {
    this._blocked = true
  }

  tick() {
    if (this.in().reset().isTriggering()) {
      this._blocked = false
    } else if (!this._blocked) {
      if (this.in().value().isTriggering()) {
        this._blocked = true
        this.out().res().set(this.in().value().get())
      }
    }
  }
}
