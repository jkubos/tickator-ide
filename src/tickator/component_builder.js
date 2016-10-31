import Validate from '../util/validate'
import TickletRepository from './ticklet_repository'
import ComponentRepository from './component_repository'
import ComponentDefinition from './component_definition'
import InstanceDefinitionBuilder from './instance_definition_builder'

export default class ComponentBuilder {
  constructor(tickletRepository, componentRepository) {
    Validate.isA(tickletRepository, TickletRepository)
    Validate.isA(componentRepository, ComponentRepository)

    this.tickletRepository = tickletRepository
    this.componentRepository = componentRepository

    this.instances = {}
  }

  build() {
    return new ComponentDefinition(this.nameVal, this.instances)
  }

  name (nameVal) {
    Validate.notBlank(nameVal)
    this.nameVal = nameVal
  }

  instance (block) {
    Validate.isFunctionWithArity(block, 1)

    const instance_definition_builder = new InstanceDefinitionBuilder(this.tickletRepository, this.componentRepository)

    block(instance_definition_builder)

    const res = instance_definition_builder.build()

    Validate.notSet(this.instances, res.name())

    this.instances[res.name()] = res
  }

  connect (refFrom, refTo) {
    const [, refFromObj, refFromOutput, ...restFrom] = (/(.*)->(.*)/g).exec(refFrom)
    const [, refToObj, refToInput, ...restTo] = (/(.*)->(.*)/g).exec(refTo)

    Validate.notBlank(refFromObj, `Cannot get source name from reference '${refFrom}'`)
    Validate.notBlank(refFromOutput, `Cannot get source output name from reference '${refFrom}'`)

    Validate.notBlank(refToObj, `Cannot get target name from reference '${refTo}'`)
    Validate.notBlank(refToInput, `Cannot get target input name from reference '${refTo}'`)

    Validate.valid(this.instances[refFromObj]!==undefined, `Cannot find source instance '${refFromObj}'`)

    const objFrom = this.instances[refFromObj].definition()

    Validate.valid(objFrom.hasOutput(refFromOutput))

    Validate.valid(this.instances[refToObj]!==undefined, `Cannot find target instance '${refToObj}'`)

    const objTo = this.instances[refToObj].definition()

    Validate.valid(objTo.hasInput(refToInput))
  }
}
