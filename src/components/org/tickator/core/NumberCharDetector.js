import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {
  b.input(b=>{
    b.name("char")
    b.position('left', 0.5)
  })

  for (let i=0;i<10;++i) {
    b.output(b=>{
      b.name("v"+i)
      b.position('right', 0.05+i*0.1)
    })
  }

  b.output(b=>{
    b.name("fail")
    b.position('bottom', 0.5)
  })

  for (let i=0;i<10;++i) {
    b.instance(b=>{
      b.name('v'+i)
      b.ticklet('ValueDetector')
      b.x(330+Math.floor(i/5)*200)
      b.y(80+(i%5)*100)
      b.property('value', ''+i)
    })
  }

  b.instance(b=>{
    b.name('c')
    b.ticklet('WaitForAll')
    b.x(430)
    b.y(600)
  })

  for (let i=0;i<10;++i) {
    b.connect(b=>{
      b.fromThis()
      b.fromOutput('char')
      b.toInstance('v'+i)
      b.toInput('value')
    })

    b.connect(b=>{
      b.fromInstance('v'+i)
      b.fromOutput('eq')
      b.toThis()
      b.toInput('v'+i)
    })

    b.connect(b=>{
      b.fromInstance('v'+i)
      b.fromOutput('neq')
      b.toInstance('c')
      b.toInput('value')
    })
  }

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

  b.size(120, 200)
}
