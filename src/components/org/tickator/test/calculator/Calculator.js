export function defineFunction(b) {

  b.instance(b=>{
    b.name('i')
    b.ticklet('LineInput')
    b.x(50)
    b.y(200)
  })

  b.instance(b=>{
    b.name('iter')
    b.ticklet('StringIterator')
    b.x(200)
    b.y(200)
  })

  b.instance(b=>{
    b.name('e')
    b.component('org.tickator.test.calculator.Engine')
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
    b.name('c')
    b.ticklet('Countdown')
    b.x(200)
    b.y(400)
    b.property('value', 2)

    b.inputPosition('value', 'right', 0.7)
    b.inputPosition('reset', 'left', 0.7)
    b.outputPosition('done', 'top', 0.5)
  })

  b.instance(b=>{
    b.name('cd')
    b.component('org.tickator.core.NumberCharDetector')
    b.x(400)
    b.y(200)
  })

  b.instance(b=>{
    b.name('od')
    b.component('org.tickator.core.OperatorCharDetector')
    b.x(610)
    b.y(450)
  })

  b.connect(b=>{
    b.fromInstance('i')
    b.fromOutput('res')
    b.toInstance('iter')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromInstance('e')
    b.fromOutput('display')
    b.toInstance('p')
    b.toInput('val')
  })

  b.connect(b=>{
    b.fromInstance('iter')
    b.fromOutput('character')
    b.toInstance('cd')
    b.toInput('char')
  })

  b.connect(b=>{
    b.fromInstance('iter')
    b.fromOutput('character')
    b.toInstance('c')
    b.toInput('reset')
  });

  b.connect(b=>{
    b.fromInstance('iter')
    b.fromOutput('character')
    b.toInstance('od')
    b.toInput('char')
  });

  ['add', 'sub', 'mul', 'div'].forEach(c=>{
    b.connect(b=>{
      b.fromInstance('od')
      b.fromOutput(c)
      b.toInstance('e')
      b.toInput(c)
    });
  })

  b.connect(b=>{
    b.fromInstance('cd')
    b.fromOutput('fail')
    b.toInstance('c')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromInstance('od')
    b.fromOutput('fail')
    b.toInstance('c')
    b.toInput('value')
  })

  b.connect(b=>{
    b.fromInstance('c')
    b.fromOutput('done')
    b.toInstance('iter')
    b.toInput('next')
  })

  b.connect(b=>{
    b.fromInstance('e')
    b.fromOutput('done')
    b.toInstance('iter')
    b.toInput('next')
  })

  for (let i=0;i<10;++i) {
    b.connect(b=>{
      b.fromInstance('cd')
      b.fromOutput('v'+i)
      b.toInstance('e')
      b.toInput('v'+i)
    })
  }
}
