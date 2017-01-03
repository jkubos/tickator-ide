import {Validate} from '~/src/util/Validate'

const operators = {
  add: '+',
  sub: '-',
  mul: '*',
  div: '/'
}

export function defineFunction(b) {
  b.input(b=>{
    b.name("char")
    b.position('left', 0.5)
  })

  Object.keys(operators).forEach((o, i)=>{
    b.output(b=>{
      b.name(o)
      b.position('top', 0.2+i*0.2)
    })
  })

  b.output(b=>{
    b.name("fail")
    b.position('bottom', 0.5)
  })

  Object.keys(operators).forEach((o, i)=>{
      b.instance(b=>{
        b.name(o)
        b.ticklet('ValueDetector')
        b.x(330)
        b.y(180+i*100)
        b.property('value', ''+operators[o])
      })
  })

  b.instance(b=>{
    b.name('c')
    b.ticklet('Countdown')
    b.x(430)
    b.y(600)
    b.property('value', 4)
  })

  Object.keys(operators).forEach((o, i)=>{
      b.connect(b=>{
        b.fromThis()
        b.fromOutput('char')
        b.toInstance(o)
        b.toInput('value')
      })

      b.connect(b=>{
        b.fromInstance(o)
        b.fromOutput('eq')
        b.toThis()
        b.toInput(o)
      })

      b.connect(b=>{
        b.fromInstance(o)
        b.fromOutput('neq')
        b.toInstance('c')
        b.toInput('value')
      })
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('char')
    b.toInstance('c')
    b.toInput('reset')
  })

  b.connect(b=>{
    b.fromInstance('c')
    b.fromOutput('done')
    b.toThis()
    b.toInput('fail')
  })

  b.size(160, 80)
}
