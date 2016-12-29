import {Validate} from '../../util/validate'
import {Ticklet} from '~/src/tickator/instance/ticklet'

export class Print extends Ticklet {

  static define(b) {
    b.klass(Print)

    b.comment("Prints input to console")

    b.input(b=>{
      b.name("val")
      b.position('left', 0.5)
    })
  }

  tick() {
    this.dispatcher().getPlatformApi().log(this.in().val().get())
  }
}
