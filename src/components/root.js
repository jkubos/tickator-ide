import Validate from '../util/validate'

export default function defineFunction(builder) {
  builder.name('Root')

  builder.instance(instanceBuilder=>{
    instanceBuilder.name('p')
    instanceBuilder.ticklet('Print')
  })

  builder.instance(instanceBuilder=>{
    instanceBuilder.name('c1')
    instanceBuilder.ticklet('Const')
    instanceBuilder.property('value', 1)
  })

  builder.instance(instanceBuilder=>{
    instanceBuilder.name('c2')
    instanceBuilder.ticklet('Const')
    instanceBuilder.property('value', 41)
  })

  builder.instance(componentBuilder=>{
    componentBuilder.name('s')
    componentBuilder.ticklet('Sum')
  })

  builder.connect('c1->res', 's->a')
  builder.connect('c2->res', 's->b')
  builder.connect('s->res', 'p->val')
}
