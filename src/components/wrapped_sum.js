import Validate from '~/src/util/validate'

export default function defineFunction(b) {
  b.name('WrappedSum')

  b.input(b=>{
    b.name("a1")
    b.validate(Validate.isNumber)
    b.position('left', 0.3)
  })

  b.input(b=>{
    b.name("b1")
    b.validate(Validate.isNumber)
    b.position('left', 0.7)
  })

  b.output(b=>{
    b.name("res1")
    b.validate(Validate.isNumber)
    b.position('right', 0.5)
  })

  // b.output(b=>{
  //   b.name("res2")
  //   b.validate(Validate.isNumber)
  //   b.position('left', 0.5)
  // })

  b.instance(b=>{
    b.name('s')
    b.ticklet('Sum')
    b.x(300)
    b.y(200)
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('a1')
    b.toInstance('s')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('b1')
    b.toInstance('s')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toThis()
    b.toInput('res1')
  })
}
