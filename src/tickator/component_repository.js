import Validate from '../util/validate'
import ComponentBuilder from './component_builder'
import TickletRepository from './ticklet_repository'

export default class ComponentRepository {
   constructor(tickletRepository) {
     Validate.isA(tickletRepository, TickletRepository)

     this.tickletRepository = tickletRepository
     this.componentsVal = {}
   }

   addAll(components) {
     Validate.isArray(components)

     components.forEach(component=>{
       Validate.isFunctionWithArity(component, 1)

       const componentBuilder = new ComponentBuilder(this.tickletRepository)

       const res = component(componentBuilder)

       Validate.isNull(res)

       const componentDefinition = componentBuilder.build()

       console.log(`Defined %c component ${componentDefinition.name()} %c %o`,
          'color: #00aa00; font-weight: bold',
          'color: #000000; font-weight: normal',
          componentDefinition.toDebug())

       Validate.notSet(this.componentsVal, componentDefinition.name())

       this.componentsVal[componentDefinition.name()] = componentDefinition
     })
   }
 }
