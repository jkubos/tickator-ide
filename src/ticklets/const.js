import Validate from '../util/validate'


export default class Const {
  static define(b) {
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
    this.outputs().res(this.properties().value())
  }
}
