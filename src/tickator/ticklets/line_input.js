import {Validate} from '../../util/validate'
import {Ticklet} from '~/src/tickator/instance/ticklet'

export class LineInput extends Ticklet {

  static define(b) {
    b.klass(LineInput)

    b.comment("Emit user input by lines")

    b.output(b=>{
      b.name("res")
      b.position('right', 0.5)
    })
  }

  constructor(dispatcher, instanceDefinition, ownerComponent) {
    super(dispatcher, instanceDefinition, ownerComponent)

    dispatcher.getPlatformApi().onInput(value=>{
      this._lastValue = value
      this._dispatcher.schedule(this)
    })
  }

  tick() {
    this.out().res().set(this._lastValue)
  }
}
