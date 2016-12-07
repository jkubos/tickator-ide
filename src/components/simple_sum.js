import Validate from '~/src/util/validate'

export default function defineFunction(b) {
  b.name('SimpleSum')

  b.instance(b=>{
    b.name('c1')
    b.ticklet('Const')
    b.property('value', 1)
    b.x(100)
    b.y(100)
  })

  b.instance(b=>{
    b.name('c2')
    b.ticklet('Const')
    b.property('value', 41)
    b.x(100)
    b.y(300)
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
    b.fromInstance('c2')
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

  b.property(b=>{
    b.name('test')
  })
}