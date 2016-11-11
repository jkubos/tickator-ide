import Validate from '~/src/util/validate'
import Ticklet from '~/src/tickator/instance/ticklet'
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
    return new TickletDefinition(this.klassVal, name, this.commentVal, this.inputs, this.outputs,
      this.properties, this.autostartVal)
  }

  klass(val) {
    Validate.extends(val, Ticklet)
    this.klassVal = val
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

    const inputObj = builder.build()

    Validate.valid(this.inputs.every(other=>other.name()!==inputObj.name())
    , `Duplicit input name '${inputObj.name()}'`)

    this.inputs.push(inputObj)
  }

  output(block) {
    Validate.isFunctionWithArity(block, 1)

    const builder = new OutputDefinitionBuilder()

    const res = block(builder)

    Validate.isNull(res)

    const outputObj = builder.build()

    Validate.valid(this.outputs.every(other=>other.name()!==outputObj.name())
    , `Duplicit output name '${outputObj.name()}'`)

    this.outputs.push(outputObj)
  }

  property(block) {
    Validate.isFunctionWithArity(block, 1)

    const builder = new PropertyDefinitionBuilder()

    const res = block(builder)

    Validate.isNull(res)

    const propertyObj = builder.build()

    Validate.valid(this.properties.every(other=>other.name()!==propertyObj.name())
    , `Duplicit property name '${propertyObj.name()}'`)

    this.properties.push(propertyObj)
  }

  autostart() {
    this.autostartVal = true
  }
}
