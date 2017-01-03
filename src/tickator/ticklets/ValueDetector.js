import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class ValueDetector extends Ticklet {

  static define(b) {
    b.klass(ValueDetector)

    b.comment("Detect same value on input")

    b.input(b=>{
      b.name("value")
      b.validate(Validate.isNumber)
      b.position('left', 0.8)
    })

    b.output(b=>{
      b.name("res")
      b.validate(Validate.isNumber)
      b.position('right', 0.8)
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
