import {Validate} from '~/src/util/Validate'
import {TickletDefinitionBuilder} from './TickletDefinitionBuilder'
import {TickletDefinition} from './TickletDefinition'

export class TickletRepository {
  constructor() {
    this.definitionsVal = {}
  }

  add(tickletClass) {
    console.log(`Adding ticklet definition ${tickletClass.name}`)

    Validate.isFunctionWithArity(tickletClass.define, 1, `Static function define(builder) not defined on ${tickletClass.name} or defined with wrong arity`)
    Validate.isFunctionWithArity(tickletClass.prototype.tick, 0, `Function tick() not defined on ${tickletClass.name} or defined with wrong arity`)

    const definitionBuilder = new TickletDefinitionBuilder()
    const res = tickletClass.define(definitionBuilder)

    Validate.isNull(res)

    const tickletDefinition = definitionBuilder.build(tickletClass.name)

    console.log(`Defined %c ticklet ${tickletDefinition.name()} %c %o`,
       'color: #00aa00; font-weight: bold',
       'color: #000000; font-weight: normal',
       tickletDefinition.toDebug())


    this.definitionsVal[tickletDefinition.name()] = tickletDefinition
  }

  definitions() {
    return Object.keys(this.definitionsVal).map(k=>this.definitionsVal[k])
  }

  isDefined(tickletName) {
    return this.definitionsVal[tickletName] instanceof TickletDefinition
  }

  get(tickletName) {
    Validate.isSet(this.definitionsVal, tickletName)

    return this.definitionsVal[tickletName]
  }
}
