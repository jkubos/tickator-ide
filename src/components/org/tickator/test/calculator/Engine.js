export function defineFunction(b) {

  for (let i=0;i<10;++i) {
    b.input(b=>{
      b.name("v"+i)
      b.position('left', 0.05+i*0.1)
    })
  }

  ["add", "sub", "mul", "div"].forEach((name, i)=>{
    b.input(b=>{
      b.name(name)
      b.position('bottom', 0.3+i*0.2)
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

  b.size(120, 160)
}
