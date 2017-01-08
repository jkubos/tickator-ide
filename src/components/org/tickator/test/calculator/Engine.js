export function defineFunction(b) {

  for (let i=0;i<10;++i) {
    b.input(b=>{
      b.name("v"+i)
      b.position('left', 0.05+i*0.1)
    })
  }

  ["add", "sub", "mul", "div", 'eq'].forEach((name, i)=>{
    b.input(b=>{
      b.name(name)
      b.position('bottom', 0.2+i*0.15)
    })
  })

  b.output(b=>{
    b.name("done")
    b.position('top', 0.5)
  })

  b.output(b=>{
    b.name("display")
    b.position('right', 0.5)
  })

  b.instance(b=>{
    b.name('i2n')
    b.component('org.tickator.core.InputToNumber')
    b.x(200)
    b.y(200)
  })

  for (let i=0;i<10;++i) {
    b.connect(b=>{
      b.fromThis()
      b.fromOutput('v'+i)
      b.toInstance('i2n')
      b.toInput('v'+i)
    })
  }

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(400)
    b.y(200)
  })

  b.connect(b=>{
    b.fromInstance('i2n')
    b.fromOutput('res')
    b.toInstance('p')
    b.toInput('val')
  })

  b.size(180, 200)
}
