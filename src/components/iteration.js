import Validate from '~/src/util/validate'

export default function defineFunction(b) {
  b.name('Iteration')

  b.instance(b=>{
    b.name('c1')
    b.ticklet('Const')
    b.property('value', 1)
    b.x(100)
    b.y(100)
  })

  b.instance(b=>{
    b.name('s')
    b.ticklet('Sum')
    b.x(300)
    b.y(200)
  })

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(500)
    b.y(200)
  })

  b.connect(b=>{
    b.fromInstance('c1')
    b.fromOutput('res')
    b.toInstance('s')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('s')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('p')
    b.toInput('val')
  })
}
