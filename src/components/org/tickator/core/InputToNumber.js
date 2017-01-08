import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {
  b.output(b=>{
    b.name("res")
    b.position('right', 0.5)
  })

  b.instance(b=>{
    b.name('sa')
    b.ticklet('SelectAny')
    b.x(500)
    b.y(400)
  })

  for (let i=0;i<10;++i) {
    b.input(b=>{
      b.name("v"+i)
      b.position('left', 0.05+i*0.1)
    })

    b.instance(b=>{
      b.name('r'+i)
      b.ticklet('Register')
      b.x(130+Math.floor(i/5)*200)
      b.y(80+(i%5)*100)
      b.property('value', i)
    })

    b.connect(b=>{
      b.fromThis()
      b.fromOutput('v'+i)
      b.toInstance('r'+i)
      b.toInput('send')
    })

    b.connect(b=>{
      b.fromInstance('r'+i)
      b.fromOutput('res')
      b.toInstance('sa')
      b.toInput('in')
    })
  }

  b.connect(b=>{
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toThis()
    b.toInput('res')
  })
  
  b.size(120, 200)
}
