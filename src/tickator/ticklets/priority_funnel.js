import {Validate} from '../../util/validate'
import {Ticklet} from '~/src/tickator/instance/ticklet'

export class PriorityFunnel extends Ticklet {

  static define(b) {
    b.klass(PriorityFunnel)

    b.comment("Pass values from one of inputs to output. If both inputs arrive at the same time, takes priority one.")

    b.input(b=>{
      b.name("prior")
      b.position('left', 0.3)
    })

    b.input(b=>{
      b.name("other")
      b.position('left', 0.7)
    })

    b.output(b=>{
      b.name("res")
      b.position('right', 0.5)
    })
  }

  tick() {
    if (this.in().prior().isTriggering()) {
      this.out().res().set(this.in().prior().get())
    } else if (this.in().other().isTriggering()) {
      this.out().res().set(this.in().other().get())
    }
  }
}
