import {Validate} from '~/src/util/Validate'
import {TickletRepository} from './TickletRepository'
import {ComponentRepository} from './ComponentRepository'
import {ComponentDefinition} from './ComponentDefinition'
import {InstanceDefinitionBuilder} from './InstanceDefinitionBuilder'
import {ConnectionDefinitionBuilder} from './ConnectionDefinitionBuilder'
import {PropertyDefinitionBuilder} from './PropertyDefinitionBuilder'
import {InputDefinitionBuilder} from './InputDefinitionBuilder'
import {OutputDefinitionBuilder} from './OutputDefinitionBuilder'

export class ComponentDefinitionBuilder {
  constructor(tickletRepository, componentRepository, path) {
    Validate.isA(tickletRepository, TickletRepository)
    Validate.isA(componentRepository, ComponentRepository)
    Validate.isArray(path)

    this.tickletRepository = tickletRepository
    this.componentRepository = componentRepository

    this.path = path
    this.instances = {}
    this.connections = {}
    this.properties = []
    this.inputs = []
    this.outputs = []
  }

  build() {
    return new ComponentDefinition(this.nameVal, this.instances, this.connections,
      this.properties, this.inputs, this.outputs, this.path)
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
