import Validate from '../util/validate'


export default class Const {
  static define(builder) {
    builder.comment("Send constant value when started")

    builder.output(outputBuilder=>{
      outputBuilder.name('res')
    })

    builder.property(propertyBuilder=>{
      propertyBuilder.name('value')
    })

    builder.autostart()
  }

  tick() {
    this.outputs().res(this.properties().value())
  }
}
