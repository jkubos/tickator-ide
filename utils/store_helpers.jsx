export function traverseScene(base, callback) {
  for (let comp of base.components) {
    if (callback(comp)) {
      return comp
    }

    for (let pin of comp.pins) {
      if (callback(pin)) {
        return pin
      }
    }
  }

  for (let wire of base.wires) {
    if (callback(wire)) {
      return wire
    }
  }

  return null
}

export function lookupInScene(base, id) {
  return traverseScene(base, o=>{
    return o.id==id
  })
}
