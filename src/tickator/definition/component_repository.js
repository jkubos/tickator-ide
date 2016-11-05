import Validate from '~/src/util/validate'
import ComponentDefinitionBuilder from './component_definition_builder'
import TickletRepository from './ticklet_repository'

export default class ComponentRepository {
   constructor(tickletRepository) {
     Validate.isA(tickletRepository, TickletRepository)

     this.tickletRepository = tickletRepository
     this.definitionsVal = {}
   }

   addAll(components) {
     Validate.isArray(components)

     components.forEach(component=>{
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
     })
   }

   definitions() {
     return Object.keys(this.definitionsVal).map(k=>this.definitionsVal[k])
   }

   isDefined(componentName) {
     return this.definitionsVal[componentName] instanceof ComponentDefinition
   }

   get(componentName) {
     Validate.isSet(this.definitionsVal, componentName)

     return this.definitionsVal[componentName]
   }
 }
