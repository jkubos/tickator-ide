import {Validate} from '~/src/util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class Const extends Ticklet {
  static define(b) {
    b.klass(Const)

    b.comment("Send constant value when started")

    b.output(b=>{
      b.name('res')
      b.position('right', 0.5)
    })

    b.property(b=>{
      b.name('value')
    })

    b.autostart()

    b.size(60, 60)
  }

  tick() {
    this.out().res().set(this.properties().value())
  }
}
