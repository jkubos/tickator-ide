import {Validate} from '~/src/util/validate'
import {TickletRepository} from './ticklet_repository'
import {ComponentRepository} from './component_repository'
import {ComponentDefinition} from './component_definition'
import {InstanceDefinitionBuilder} from './instance_definition_builder'
import {ConnectionDefinitionBuilder} from './connection_definition_builder'
import {PropertyDefinitionBuilder} from './property_definition_builder'
import {InputDefinitionBuilder} from './input_definition_builder'
import {OutputDefinitionBuilder} from './output_definition_builder'

export class ComponentDefinitionBuilder {
  constructor(tickletRepository, componentRepository) {
    Validate.isA(tickletRepository, TickletRepository)
    Validate.isA(componentRepository, ComponentRepository)

    this.tickletRepository = tickletRepository
    this.componentRepository = componentRepository

    this.instances = {}
    this.connections = {}
    this.properties = []
    this.inputs = []
    this.outputs = []
  }

  build() {
    return new ComponentDefinition(this.nameVal, this.instances, this.connections,
      this.properties, this.inputs, this.outputs)
  }

  name (nameVal) {
    Validate.notBlank(nameVal)
    this.nameVal = nameVal
  }

  instance (block) {
    Validate.isFunctionWithArity(block, 1)

    const instanceDefinitionBuilder = new InstanceDefinitionBuilder(this.tickletRepository, this.componentRepository)

    block(instanceDefinitionBuilder)

    const res = instanceDefinitionBuilder.build()

    Validate.notSet(this.instances, res.name())

    this.instances[res.name()] = res
  }

  connect (block) {
    Validate.isFunctionWithArity(block, 1)

    const connectionDefinitionBuilder = new ConnectionDefinitionBuilder(this.instances, this.inputs, this.outputs)

    block(connectionDefinitionBuilder)

    const res = connectionDefinitionBuilder.build()

    Validate.notSet(this.connections, res.uuid())

    this.connections[res.uuid()] = res
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
}
