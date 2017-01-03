export function defineFunction(b) {

  b.instance(b=>{
    b.name('i')
    b.ticklet('LineInput')
    b.x(100)
    b.y(200)
  })

  b.instance(b=>{
    b.name('v0')
    b.ticklet('ValueDetector')
    b.x(400)
    b.y(100)
    b.property('value', '0')
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

  b.connect(b=>{
    b.fromInstance('e')
    b.fromOutput('display')
    b.toInstance('p')
    b.toInput('val')
  })
}
