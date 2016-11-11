import Validate from '../../util/validate'
import Ticklet from '~/src/tickator/instance/ticklet'

export default class Sum extends Ticklet {

  static define(b) {
    b.klass(Sum)

    b.comment("Sums two numbers")

    b.input(b=>{
      b.name("a")
      b.validate(Validate.isNumber)
      b.position('top', 0.5)
    })

    b.input(b=>{
      b.name("b")
      b.validate(Validate.isNumber)
      b.position('bottom', 0.5)
    })

    b.output(b=>{
      b.name("res")
      b.validate(Validate.isNumber)
      b.position('right', 0.5)
    })
  }

  tick() {
    const a = this.in().a().get()
    const b = this.in().b().get()
    this.out().res().set(a+b)
  }
}
