import Validate from '../util/validate'

export default function defineFunction(b) {
  b.name('Root')

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(400)
    b.y(200)
  })

  b.instance(b=>{
    b.name('c1')
    b.ticklet('Const')
    b.property('value', 1)
    b.x(50)
    b.y(100)
  })

  b.instance(b=>{
    b.name('c2')
    b.ticklet('Const')
    b.property('value', 41)
    b.x(50)
    b.y(300)
  })

  b.instance(b=>{
    b.name('s')
    b.ticklet('Sum')
    b.x(200)
    b.y(200)
  })

  b.connect('c1->res', 's->a')
  b.connect('c2->res', 's->b')
  b.connect('s->res', 'p->val')
}
