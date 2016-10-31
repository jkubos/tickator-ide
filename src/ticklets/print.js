import Validate from '../util/validate'

export default class Print {
  static define(b) {
    b.comment("Prints input to console")

    b.input(b=>{
      b.name("val")
    })
  }

  tick() {
    console.log(this.inputs().val())
  }
}
