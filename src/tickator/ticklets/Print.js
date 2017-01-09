import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class Print extends Ticklet {

  static define(b) {
    b.klass(Print)

    b.comment("Prints input to console")

    b.input(b=>{
      b.name("val")
      b.position('left', 0.5)
    })

    b.size(70, 70)
  }

  tick() {
    this.in().val().outputs().forEach(o=>this.dispatcher().getPlatformApi().log(o.get()))
  }
}
