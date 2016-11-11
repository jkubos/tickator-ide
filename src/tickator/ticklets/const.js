import Validate from '~/src/util/validate'
import Ticklet from '~/src/tickator/instance/ticklet'

export default class Const extends Ticklet {
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
  }

  tick() {
    this.out().res().set(this.properties().value())
  }
}
