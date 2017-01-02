export function defineFunction(b) {
  b.instance(b=>{
    b.name('i')
    b.ticklet('LineInput')
    b.x(100)
    b.y(200)
  })

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(300)
    b.y(200)
  })

  b.connect(b=>{
    b.fromInstance('i')
    b.fromOutput('res')
    b.toInstance('p')
    b.toInput('val')
  })
}
