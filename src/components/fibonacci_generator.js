
import Validate from '~/src/util/validate'

export default function defineFunction(b) {
  b.name('FibonacciGenerator')

  b.instance(b=>{
    b.name('current')
    b.ticklet('Register')
    b.property('value', 1)
    b.x(100)
    b.y(100)
  })

  b.instance(b=>{
    b.name('prev')
    b.ticklet('Register')
    b.property('value', 0)
    b.x(300)
    b.y(100)
  })

  b.instance(b=>{
    b.name('start')
    b.ticklet('Const')
    b.property('value', 1)
    b.x(100)
    b.y(330)
  })

  b.instance(b=>{
    b.name('s')
    b.ticklet('Sum')
    b.x(600)
    b.y(300)
  })

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(600)
    b.y(100)
  })

  b.instance(b=>{
    b.name('f')
    b.ticklet('PriorityFunnel')
    b.x(300)
    b.y(330)

    b.positionInput('prior', 'left', 0.5)
    b.positionInput('other', 'right', 0.5)
    b.positionOutput('res', 'top', 0.5)
  })

  b.connect(b=>{
    b.fromInstance('prev')
    b.fromOutput('res')
    b.toInstance('p')
    b.toInput('val')
  })

  b.connect(b=>{
    b.fromInstance('prev')
    b.fromOutput('res')
    b.toInstance('s')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromInstance('current')
    b.fromOutput('res')
    b.toInstance('s')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromInstance('current')
    b.fromOutput('res')
    b.toInstance('prev')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('current')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('start')
    b.fromOutput('res')
    b.toInstance('f')
    b.toInput('prior')
  })

  b.connect(b=>{
    b.fromInstance('f')
    b.fromOutput('res')
    b.toInstance('current')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromInstance('f')
    b.fromOutput('res')
    b.toInstance('prev')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('f')
    b.toInput('other')
  })

  b.property(b=>{
    b.name('maxValue')
    b.defaultValue(1000000)
  })
}
