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
    b.y(250)
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
    b.name('dc')
    b.component('org.tickator.core.DecimalShift')
    b.x(350)
    b.y(300)

    b.inputPosition('set', 'bottom', 0.5)
  })

  b.instance(b=>{
    b.name('cr')
    b.component('org.tickator.core.ChainedRegisters')
    b.x(500)
    b.y(300)
    b.property('halfValue', 0)
    b.property('value', 0)
  })

  b.instance(b=>{
    b.name('sa')
    b.ticklet('SelectAny')
    b.x(500)
    b.y(500)
  });

  b.instance(b=>{
    b.name('sa2')
    b.ticklet('SelectAny')
    b.x(500)
    b.y(100)
  })

  b.instance(b=>{
    b.name('r')
    b.ticklet('Register')
    b.x(350)
    b.y(500)
    b.property('value', 0)

    b.outputPosition('res', 'top', 0.5)
  })

  b.instance(b=>{
    b.name('sa3')
    b.ticklet('SelectAny')
    b.x(800)
    b.y(200)
  })

  b.instance(b=>{
    b.name('dpf')
    b.component('org.tickator.core.DualPassFirst')
    b.x(650)
    b.y(300)
  });

  b.instance(b=>{
    b.name('pfeq')
    b.ticklet('PassFirst')
    b.x(650)
    b.y(500)
  })

  b.instance(b=>{
    b.name('ca')
    b.component('org.tickator.test.calculator.Calculation')
    b.x(800)
    b.y(300)
  });

  ["add", "sub", "mul", "div"].forEach((name, i)=>{
    b.connect(b=>{
      b.fromThis()
      b.fromOutput(name)
      b.toInstance('sa')
      b.toInput('in')
    })

    b.connect(b=>{
      b.fromThis()
      b.fromOutput(name)
      b.toInstance('ca')
      b.toInput(name)
    })
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('eq')
    b.toInstance('sa')
    b.toInput('in')
  });

  b.connect(b=>{
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toInstance('sa2')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('ca')
    b.fromOutput('result')
    b.toInstance('sa3')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('ca')
    b.fromOutput('result')
    b.toInstance('sa2')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('cr')
    b.fromOutput('half_res')
    b.toInstance('dpf')
    b.toInput('valueB')
  })

  b.connect(b=>{
    b.fromInstance('cr')
    b.fromOutput('res')
    b.toInstance('dpf')
    b.toInput('valueA')
  })

  b.connect(b=>{
    b.fromInstance('r')
    b.fromOutput('res')
    b.toInstance('dc')
    b.toInput('set')
  })

  b.connect(b=>{
    b.fromInstance('dpf')
    b.fromOutput('resA')
    b.toInstance('ca')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromInstance('dpf')
    b.fromOutput('resB')
    b.toInstance('ca')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('eq')
    b.toInstance('dpf')
    b.toInput('reset')
  })

  b.connect(b=>{
    b.fromThis()
    b.fromOutput('eq')
    b.toInstance('pfeq')
    b.toInput('reset')
  })

  b.connect(b=>{
    b.fromInstance('pfeq')
    b.fromOutput('res')
    b.toInstance('ca')
    b.toInput('eq')
  })

  b.connect(b=>{
    b.fromInstance('dpf')
    b.fromOutput('resA')
    b.toInstance('pfeq')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toInstance('r')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toInstance('cr')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromInstance('i2n')
    b.fromOutput('res')
    b.toInstance('dc')
    b.toInput('shift')
  })

  b.connect(b=>{
    b.fromInstance('dc')
    b.fromOutput('result')
    b.toInstance('sa3')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('sa3')
    b.fromOutput('res')
    b.toThis()
    b.toInput('display')
  })

  b.connect(b=>{
    b.fromInstance('dc')
    b.fromOutput('result')
    b.toInstance('sa2')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('dc')
    b.fromOutput('result')
    b.toInstance('cr')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('sa2')
    b.fromOutput('res')
    b.toThis()
    b.toInput('done')
  })

  b.size(180, 200)
}
