import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {
  b.input(b=>{
    b.name("in")
    b.position('left', 0.5)
  })

  b.input(b=>{
    b.name("send")
    b.position('bottom', 0.5)
  })

  b.output(b=>{
    b.name("half_res")
    b.position('right', 0.2)
  })

  b.output(b=>{
    b.name("res")
    b.position('right', 0.8)
  })

  b.instance(b=>{
    b.name('r1')
    b.ticklet('Register')
    b.x(200)
    b.y(200)
    b.property('value', (parentPropertyValues)=>parentPropertyValues['halfValue'])
  })

  b.instance(b=>{
    b.name('r2')
    b.ticklet('Register')
    b.x(500)
    b.y(200)
    b.property('value', (parentPropertyValues)=>parentPropertyValues['value'])
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('send')
    b.toInstance('r1')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('send')
    b.toInstance('r2')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('in')
    b.toInstance('r1')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('r1')
    b.fromOutput('res')
    b.toInstance('r2')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('r1')
    b.fromOutput('res')
    b.toThis()
    b.toInput('half_res')
  })

  b.connect(b=>{
    b.fromInstance('r2')
    b.fromOutput('res')
    b.toThis()
    b.toInput('res')
  })

  b.property(b=>{
    b.name('halfValue')
  })

  b.property(b=>{
    b.name('value')
  })
}
