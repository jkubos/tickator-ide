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

export function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
