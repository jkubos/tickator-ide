import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class ValueDetector extends Ticklet {

  static define(b) {
    b.klass(ValueDetector)

    b.comment("Detect same value on input")

    b.input(b=>{
      b.name("value")
      b.position('left', 0.7)
    })

    b.output(b=>{
      b.name("eq")
      b.position('right', 0.7)
    })

    b.output(b=>{
      b.name("neq")
      b.position('bottom', 0.5)
    })

    b.property(b=>{
      b.name('value')
    })

    b.size(70, 70)
  }

  tick() {
    if (this.in().a().get()===this.properties().value()) {
      this.out().res().set(true)
    }

  }
}
