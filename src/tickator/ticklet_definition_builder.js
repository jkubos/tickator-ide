import Validate from '../util/validate'
import TickletDefinition from './ticklet_definition'
import InputDefinitionBuilder from './input_definition_builder'
import OutputDefinitionBuilder from './output_definition_builder'
import PropertyDefinitionBuilder from './property_definition_builder'

export default class TickletDefinitionBuilder {
  constructor() {
    this.commentVal = ""
    this.inputs = []
    this.outputs = []
    this.properties = []
  }

  build(name) {
    return new TickletDefinition(name, this.commentVal, this.inputs, this.outputs,
      this.properties, this.autostartVal)
  }

  comment(val) {
    Validate.notBlank(val)
    this.commentVal = val
  }

  input(block) {
    Validate.isFunctionWithArity(block, 1)

    const builder = new InputDefinitionBuilder()

    const res = block(builder)

    Validate.isNull(res)

    this.inputs.push(builder.build())
  }

  output(block) {
    Validate.isFunctionWithArity(block, 1)

    const builder = new OutputDefinitionBuilder()

    const res = block(builder)

    Validate.isNull(res)

    this.outputs.push(builder.build())
  }

  property(block) {
    Validate.isFunctionWithArity(block, 1)

    const builder = new PropertyDefinitionBuilder()

    const res = block(builder)

    Validate.isNull(res)

    this.properties.push(builder.build())
  }

  autostart() {
    this.autostartVal = true
  }
}
