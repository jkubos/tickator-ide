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
    b.name('dc')
    b.component('org.tickator.core.DecimalShift')
    b.x(400)
    b.y(200)
  })

  b.instance(b=>{
    b.name('cr')
    b.component('org.tickator.core.ChainedRegisters')
    b.x(600)
    b.y(200)
  })

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(800)
    b.y(200)
  })

  b.instance(b=>{
    b.name('sa')
    b.ticklet('SelectAny')
    b.x(600)
    b.y(400)
  });

  ["add", "sub", "mul", "div", 'eq'].forEach((name, i)=>{
    b.connect(b=>{
      b.fromThis()
      b.fromOutput(name)
      b.toInstance('sa')
      b.toInput('in')
    })
  })

  b.instance(b=>{
    b.name('sa2')
    b.ticklet('SelectAny')
    b.x(500)
    b.y(100)
  })

  b.instance(b=>{
    b.name('r')
    b.ticklet('Register')
    b.x(300)
    b.y(100)
    b.property('value', 0)
  })

  b.connect(b=>{
    b.fromInstance('r')
    b.fromOutput('res')
    b.toInstance('dc')
    b.toInput('set')
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
    b.fromInstance('cr')
    b.fromOutput('half_res')
    b.toInstance('p')
    b.toInput('val')
  })

  b.connect(b=>{
    b.fromInstance('cr')
    b.fromOutput('res')
    b.toInstance('p')
    b.toInput('val')
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
    b.fromInstance('sa')
    b.fromOutput('res')
    b.toInstance('sa2')
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
