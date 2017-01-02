import {Validate} from '~/src/util/Validate'
import {ComponentDefinitionBuilder} from './ComponentDefinitionBuilder'
import {TickletRepository} from './TickletRepository'
import {ComponentDependenciesExtractor} from './ComponentDependenciesExtractor'

export class ComponentRepository {
  constructor(tickletRepository) {
    Validate.isA(tickletRepository, TickletRepository)

    this.tickletRepository = tickletRepository
    this._root = {
      _subs: {}
    }
  }

  addAll(components) {
    Validate.isArray(components)

    const componentDependencies = this._extractDependencies(components)

    const doneComponents = []

    while (doneComponents.length<components.length) {
      const component = components.find(component=>
        !doneComponents.includes(component.func)
        &&
        componentDependencies[component.func].every(name=>this.isDefined(name))
      )

      if (component===undefined) {
        const deps = []

        components.forEach(component=>{
          if (!doneComponents.includes(component.func)) {
            componentDependencies[component.func].forEach(dep=>deps.push(dep))
          }
        })

        throw `Cyclic dependency? Missing dependencies are: ${[...new Set(deps)].join(', ')}`
      }

      doneComponents.push(component.func)

      Validate.isFunctionWithArity(component.func, 1)

      const componentBuilder = new ComponentDefinitionBuilder(this.tickletRepository, this, component.path)

      const res = component.func(componentBuilder)

      Validate.isNull(res)

      const componentDefinition = componentBuilder.build()

      console.log(`Defined %c component ${componentDefinition.name()} %c %o`,
        'color: #00aa00; font-weight: bold',
        'color: #000000; font-weight: normal',
        componentDefinition.toDebug())

      const [namespaceParts, name] = this.splitId(componentDefinition.id())

      let act = this._root

      namespaceParts.forEach(part=>{
        if (act._subs[part]===undefined) {
          act._subs[part] = {
            _subs: {}
          }
        }

        act = act._subs[part]
      })

      Validate.notSet(act, name)

      act[name] = componentDefinition
    }
  }

  splitId(id) {
    const fullPath = id.split(".")
    const namespaceParts = fullPath.slice(0, -1)
    const name = fullPath[fullPath.length-1]

    return [namespaceParts, name]
  }

  getTreeRoot() {
    return this._root
  }

  isDefined(id) {
    const [namespaceParts, name] = this.splitId(id)

    let act = this._root

    namespaceParts.forEach(part=>{
      if (act!==undefined) {
        act = act._subs[part]
      }
    })

    if (act===undefined) {
      return false
    }

    return act[name]!==undefined
  }

  get(id) {
    const [namespaceParts, name] = this.splitId(id)

    let act = this._root

    namespaceParts.forEach(part=>{
      if (act!==undefined) {
        act = act._subs[part]
      }
    })

    Validate.notNull(act)

    Validate.isSet(act, name)

    return act[name]
  }

  _extractDependencies(components) {
    const componentDependencies = {}

    components.forEach(component=>{
      Validate.isFunctionWithArity(component.func, 1)

      const componentDependenciesExtractor = new ComponentDependenciesExtractor()

      const res = component.func(componentDependenciesExtractor)

      Validate.isNull(res)

      componentDependencies[component.func] = componentDependenciesExtractor.getDependencies()
    })

    return componentDependencies
  }
}
