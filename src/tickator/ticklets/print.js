import Validate from '../../util/validate'
import Ticklet from '~/src/tickator/instance/ticklet'

export default class Print extends Ticklet {

  static define(b) {
    b.klass(Print)

    b.comment("Prints input to console")

    b.input(b=>{
      b.name("val")
      b.position('left', 0.5)
    })
  }

  tick() {
    console.log(this.inputs().val())
  }
}
