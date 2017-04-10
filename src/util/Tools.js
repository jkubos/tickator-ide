export function toCamelCase(str) {
  return str.replace(/[_-]([a-z])/g, g=>g[1].toUpperCase())
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export class Tools {
  static generateUUID() {
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

  static flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? Tools.flatten(toFlatten) : toFlatten);
    }, []);
  }

  static isTouchDevice() {
    return !!('ontouchstart' in window)
  }
}
