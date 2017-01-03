export function defineFunction(b) {
  b.input(b=>{
    b.name("v0")
    b.position('left', 0.05)
  })

  b.input(b=>{
    b.name("v1")
    b.position('left', 0.15)
  })

  b.input(b=>{
    b.name("v2")
    b.position('left', 0.25)
  })

  b.input(b=>{
    b.name("v3")
    b.position('left', 0.35)
  })

  b.input(b=>{
    b.name("v4")
    b.position('left', 0.45)
  })

  b.input(b=>{
    b.name("v5")
    b.position('left', 0.55)
  })

  b.input(b=>{
    b.name("v6")
    b.position('left', 0.65)
  })

  b.input(b=>{
    b.name("v7")
    b.position('left', 0.75)
  })

  b.input(b=>{
    b.name("v8")
    b.position('left', 0.85)
  })

  b.input(b=>{
    b.name("v9")
    b.position('left', 0.95)
  })

  b.input(b=>{
    b.name("add")
    b.position('bottom', 0.3)
  })

  b.input(b=>{
    b.name("sub")
    b.position('bottom', 0.5)
  })

  b.input(b=>{
    b.name("mul")
    b.position('bottom', 0.7)
  })

  b.input(b=>{
    b.name("div")
    b.position('bottom', 0.9)
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
