import Validate from '../util/validate'

export default class Print {
  static define(builder) {
    builder.comment("Prints input to console")

    builder.input(inputBuilder=>{
      inputBuilder.name("val")
    })
  }

  tick() {
    console.log(this.inputs().val())
  }
}
