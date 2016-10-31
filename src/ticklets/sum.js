import Validate from '../util/validate'

export default class Sum {
  static define(b) {
    b.comment("Sums two numbers")

    b.input(b=>{
      b.name("a")
      b.validate(Validate.isNumber)
    })

    b.input(b=>{
      b.name("b")
      b.validate(Validate.isNumber)
    })

    b.output(b=>{
      b.name("res")
      b.validate(Validate.isNumber)
    })
  }

  tick() {
    this.outputs().res(this.inputs().a()+this.inputs().b())
  }
}
