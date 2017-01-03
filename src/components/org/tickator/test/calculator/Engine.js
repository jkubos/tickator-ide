export function defineFunction(b) {
  b.input(b=>{
    b.name("0")
    b.position('left', 0.05)
  })

  b.input(b=>{
    b.name("1")
    b.position('left', 0.15)
  })

  b.input(b=>{
    b.name("2")
    b.position('left', 0.25)
  })

  b.input(b=>{
    b.name("3")
    b.position('left', 0.35)
  })

  b.input(b=>{
    b.name("4")
    b.position('left', 0.45)
  })

  b.input(b=>{
    b.name("5")
    b.position('left', 0.55)
  })

  b.input(b=>{
    b.name("6")
    b.position('left', 0.65)
  })

  b.input(b=>{
    b.name("7")
    b.position('left', 0.75)
  })

  b.input(b=>{
    b.name("8")
    b.position('left', 0.85)
  })

  b.input(b=>{
    b.name("9")
    b.position('left', 0.95)
  })

  b.input(b=>{
    b.name("+")
    b.position('bottom', 0.3)
  })

  b.input(b=>{
    b.name("-")
    b.position('bottom', 0.5)
  })

  b.input(b=>{
    b.name("*")
    b.position('bottom', 0.7)
  })

  b.input(b=>{
    b.name("/")
    b.position('bottom', 0.9)
  })

  b.output(b=>{
    b.name("processed")
    b.position('top', 0.5)
  })

  b.output(b=>{
    b.name("display")
    b.position('right', 0.5)
  })
}
