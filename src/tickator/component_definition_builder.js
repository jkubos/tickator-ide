import Validate from '../util/validate'
import TickletRepository from './ticklet_repository'
import ComponentRepository from './component_repository'
import ComponentDefinition from './component_definition'
import InstanceDefinitionBuilder from './instance_definition_builder'
import ConnectionDefinitionBuilder from './connection_definition_builder'

export default class ComponentDefinitionBuilder {
  constructor(tickletRepository, componentRepository) {
    Validate.isA(tickletRepository, TickletRepository)
    Validate.isA(componentRepository, ComponentRepository)

    this.tickletRepository = tickletRepository
    this.componentRepository = componentRepository

    this.instances = {}
    this.connections = {}
  }

  build() {
    return new ComponentDefinition(this.nameVal, this.instances, this.connections)
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

    const connectionDefinitionBuilder = new ConnectionDefinitionBuilder(this.instances)

    block(connectionDefinitionBuilder)

    const res = connectionDefinitionBuilder.build()

    Validate.notSet(this.connections, res.uuid())

    this.connections[res.uuid()] = res
  }
}
