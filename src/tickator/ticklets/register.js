import Validate from '~/src/util/validate'
import Ticklet from '~/src/tickator/instance/ticklet'

export default class Register extends Ticklet {
  static define(b) {
    b.klass(Register)

    b.comment("Storest last incomming value and send it if asked")

    b.input(b=>{
      b.name("in")
      b.position('left', 0.5)
    })

    b.input(b=>{
      b.name("send")
      b.position('bottom', 0.5)
    })

    b.output(b=>{
      b.name('res')
      b.position('right', 0.5)
    })

    b.property(b=>{
      b.name('value')
    })
  }

  initialize() {
    this._value = this.properties().value()
  }

  tick() {
    if (this.in().send().isTriggering()) {
      this.out().res().set(this._value)
    }

    if (this.in().in().isTriggering()) {
      this._value = this.in().in().get()
    }
  }
}
