import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {

  b.input(b=>{
    b.name("valueA")
    b.position('left', 0.3)
  })

  b.input(b=>{
    b.name("valueB")
    b.position('left', 0.7)
  })

  b.input(b=>{
    b.name("reset")
    b.position('bottom', 0.5)
  })

  b.output(b=>{
    b.name("resA")
    b.position('right', 0.3)
  })

  b.output(b=>{
    b.name("resB")
    b.position('right', 0.7)
  })

  b.instance(b=>{
    b.name('pfa')
    b.ticklet('PassFirst')
    b.x(200)
    b.y(200)
  })

  b.instance(b=>{
    b.name('pfb')
    b.ticklet('PassFirst')
    b.x(200)
    b.y(400)
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('valueA')
    b.toInstance('pfa')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('valueB')
    b.toInstance('pfb')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('reset')
    b.toInstance('pfa')
    b.toInput('reset')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('reset')
    b.toInstance('pfb')
    b.toInput('reset')
  })

  b.connect(b=>{
    b.fromInstance('pfa')
    b.fromOutput('res')
    b.toThis()
    b.toInput('resA')
  })

  b.connect(b=>{
    b.fromInstance('pfb')
    b.fromOutput('res')
    b.toThis()
    b.toInput('resB')
  })

  b.size(100, 100)
}
