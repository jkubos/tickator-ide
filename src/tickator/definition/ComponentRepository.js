import {Validate} from '~/src/util/Validate'
import {ComponentDefinitionBuilder} from './ComponentDefinitionBuilder'
import {TickletRepository} from './TickletRepository'
import {ComponentDependenciesExtractor} from './ComponentDependenciesExtractor'

export class ComponentRepository {
  constructor(tickletRepository) {
    Validate.isA(tickletRepository, TickletRepository)

    this.tickletRepository = tickletRepository
    this.definitionsVal = {}
  }

  addAll(components) {
    Validate.isArray(components)

    const componentDependencies = this._extractDependencies(components)

    const doneComponents = []

    while (doneComponents.length<components.length) {
      const component = components.find(component=>
        !doneComponents.includes(component)
        &&
        componentDependencies[component].every(name=>this.isDefined(name))
      )

      if (component===undefined) {
        throw "Cyclic dependency? TODO: provide better debug info"
      }

      doneComponents.push(component)

      Validate.isFunctionWithArity(component, 1)

      const componentBuilder = new ComponentDefinitionBuilder(this.tickletRepository, this)

      const res = component(componentBuilder)

      Validate.isNull(res)

      const componentDefinition = componentBuilder.build()

      console.log(`Defined %c component ${componentDefinition.name()} %c %o`,
        'color: #00aa00; font-weight: bold',
        'color: #000000; font-weight: normal',
        componentDefinition.toDebug())

      Validate.notSet(this.definitionsVal, componentDefinition.name())

      this.definitionsVal[componentDefinition.name()] = componentDefinition
    }
  }

  definitions() {
    return Object.keys(this.definitionsVal).map(k=>this.definitionsVal[k])
  }

  isDefined(componentName) {
    return this.definitionsVal[componentName]!==undefined
  }

  get(componentName) {
    Validate.isSet(this.definitionsVal, componentName)

    return this.definitionsVal[componentName]
  }

  _extractDependencies(components) {
    const componentDependencies = {}

    components.forEach(component=>{
      Validate.isFunctionWithArity(component, 1)

      const componentDependenciesExtractor = new ComponentDependenciesExtractor()

      const res = component(componentDependenciesExtractor)

      Validate.isNull(res)

      componentDependencies[component] = componentDependenciesExtractor.getDependencies()
    })

    return componentDependencies
  }
}
