import Validate from '../util/validate'

export default class Sum {
  static define(builder) {
    builder.comment("Sums two numbers")

    builder.input(inputBuilder=>{
      inputBuilder.name("a")
      inputBuilder.validate(Validate.isNumber)
    })

    builder.input(inputBuilder=>{
      inputBuilder.name("b")
      inputBuilder.validate(Validate.isNumber)
    })

    builder.output(outputBuilder=>{
      outputBuilder.name("res")
      outputBuilder.validate(Validate.isNumber)
    })
  }

  tick() {
    this.outputs().res(this.inputs().a()+this.inputs().b())
  }
}
