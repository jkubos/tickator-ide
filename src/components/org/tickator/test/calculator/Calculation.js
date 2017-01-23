const operationsToComponent = {
  "add" : "Sum",
  "sub": undefined,
  "mul" : "Multiply",
  "div": undefined
}

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
    b.name('sa')
    b.ticklet('SelectAny')
    b.x(800)
    b.y(300)
  })

  Object.keys(operationsToComponent).forEach((name, i)=>{
    const compName = operationsToComponent[name]

    if (compName) {
      b.instance(b=>{
        b.name(name)
        b.ticklet(compName)
        b.x(600)
        b.y(200+i*100)
      })

      b.instance(b=>{
        b.name('dpf'+i)
        b.component('org.tickator.core.DualPassFirst')
        b.x(400)
        b.y(200+i*100)
      })

      b.connect(b=>{
        b.fromInstance('dpf'+i)
        b.fromOutput('resA')
        b.toInstance(name)
        b.toInput('a')
      })

      b.connect(b=>{
        b.fromInstance('dpf'+i)
        b.fromOutput('resB')
        b.toInstance(name)
        b.toInput('b')
      })

      b.connect(b=>{
        b.fromInstance('ra')
        b.fromOutput('res')
        b.toInstance('dpf'+i)
        b.toInput('valueA')
      })

      b.connect(b=>{
        b.fromInstance('rb')
        b.fromOutput('res')
        b.toInstance('dpf'+i)
        b.toInput('valueB')
      })

      b.connect(b=>{
        b.fromThis()
        b.fromOutput(name)
        b.toInstance('dpf'+i)
        b.toInput('reset')
      })

      b.connect(b=>{
        b.fromInstance(name)
        b.fromOutput('res')
        b.toInstance('sa')
        b.toInput('in')
        b.probe(`res ${name}`)
      })
    }
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

  b.size(100, 100)
}
