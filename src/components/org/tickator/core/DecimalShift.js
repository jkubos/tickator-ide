import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {
  b.input(b=>{
    b.name("shift")
    b.position('left', 0.5)
  })

  b.input(b=>{
    b.name("set")
    b.position('top', 0.5)
  })

  b.output(b=>{
    b.name("result")
    b.position('right', 0.5)
  })

  b.instance(b=>{
    b.name('s')
    b.ticklet('Sum')
    b.x(100)
    b.y(300)
    b.inputPosition('b', 'bottom', 0.5)
  })

  b.instance(b=>{
    b.name('m')
    b.ticklet('Multiply')
    b.x(200)
    b.y(500)

    b.inputPosition('a', 'right', 0.3)
    b.inputPosition('b', 'right', 0.7)
    b.outputPosition('res', 'left', 0.5)
  })

  b.instance(b=>{
    b.name('sa')
    b.ticklet('SelectAny')
    b.x(350)
    b.y(400)
  })

  b.instance(b=>{
    b.name('c')
    b.ticklet('Const')
    b.x(350)
    b.y(500)
    b.property('value', 10)
    b.outputPosition('res', 'left', 0.5)
  })

  b.instance(b=>{
    b.name('pf')
    b.ticklet('PassFirst')
    b.x(250)
    b.y(300)
    b.inputPosition('reset', 'top', 0.5)
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('pf')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromInstance('c')
    b.fromOutput('res')
    b.toInstance('m')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromInstance('m')
    b.fromOutput('res')
    b.toInstance('s')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('shift')
    b.toInstance('s')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('shift')
    b.toInstance('pf')
    b.toInput('reset')
  })

  b.connect(b=>{
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toInstance('m')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromInstance('pf')
    b.fromOutput('res')
    b.toThis()
    b.toInput('result')
  })

  b.connect(b=>{
    b.fromInstance('pf')
    b.fromOutput('res')
    b.toInstance('sa')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('set')
    b.toInstance('sa')
    b.toInput('in')
  })
}
