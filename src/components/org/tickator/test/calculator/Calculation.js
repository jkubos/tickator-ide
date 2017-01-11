export function defineFunction(b) {
  b.input(b=>{
    b.name('a')
    b.position('left', 0.3)
  })

  b.input(b=>{
    b.name('b')
    b.position('left', 0.7)
  })

  b.output(b=>{
    b.name("result")
    b.position('right', 0.5)
  });

  ["add", "sub", "mul", "div"].forEach((name, i)=>{
    b.input(b=>{
      b.name(name)
      b.position('bottom', 0.2+i*0.2)
    })
  })

  b.input(b=>{
    b.name('eq')
    b.position('top', 0.5)
  })

  b.instance(b=>{
    b.name('ra')
    b.ticklet('Register')
    b.x(200)
    b.y(300)
    b.inputPosition('send', 'top', 0.5)
  })

  b.instance(b=>{
    b.name('rb')
    b.ticklet('Register')
    b.x(200)
    b.y(400)
    b.inputPosition('send', 'top', 0.5)
  })

  b.instance(b=>{
    b.name('add')
    b.ticklet('Sum')
    b.x(600)
    b.y(300)
  })

  b.instance(b=>{
    b.name('mul')
    b.ticklet('Multiply')
    b.x(600)
    b.y(400)
  })

  b.instance(b=>{
    b.name('sa')
    b.ticklet('SelectAny')
    b.x(800)
    b.y(300)
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('a')
    b.toInstance('ra')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('b')
    b.toInstance('rb')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('eq')
    b.toInstance('ra')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('eq')
    b.toInstance('rb')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toThis()
    b.toInput('result')
  })

  b.connect(b=>{
    b.fromInstance('add')
    b.fromOutput('res')
    b.toInstance('sa')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('mul')
    b.fromOutput('res')
    b.toInstance('sa')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('ra')
    b.fromOutput('res')
    b.toInstance('add')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromInstance('rb')
    b.fromOutput('res')
    b.toInstance('add')
    b.toInput('b')
  })

  b.size(100, 100)
}
