import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class Sum extends Ticklet {

  static define(b) {
    b.klass(Sum)

    b.comment("Sums two numbers")

    b.input(b=>{
      b.name("a")
      b.validate(Validate.isNumber)
      b.position('left', 0.3)
    })

    b.input(b=>{
      b.name("b")
      b.validate(Validate.isNumber)
      b.position('left', 0.7)
    })

    b.output(b=>{
      b.name("res")
      b.validate(Validate.isNumber)
      b.position('right', 0.5)
    })

    b.size(60, 60)
  }

  tick() {
    const a = this.in().a().get() || 0
    const b = this.in().b().get() || 0
    this.out().res().set(a+b)
  }
}
