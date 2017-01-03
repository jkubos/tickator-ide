import {Validate} from '../../util/Validate'
import {Ticklet} from '~/src/tickator/instance/Ticklet'

export class LineInput extends Ticklet {

  static define(b) {
    b.klass(LineInput)

    b.comment("Emit user input by lines")

    b.output(b=>{
      b.name("res")
      b.position('right', 0.8)
    })

    b.size(70, 70)
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
