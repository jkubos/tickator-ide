import {Validate} from '~/src/util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class SelectAny extends Ticklet {
  static define(b) {
    b.klass(SelectAny)

    b.comment("Select any of values incomming in one tick")

    b.input(b=>{
      b.name("in")
      b.position('left', 0.5)
    })

    b.output(b=>{
      b.name('res')
      b.position('right', 0.5)
    })

    b.size(80, 60)
  }

  tick() {
    if (this.in().in().isTriggering()) {
      this.out().res().set(this.in().in().triggeringOutputs()[0].get())
    }
  }
}
