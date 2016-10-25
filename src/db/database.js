export default class Database {
  constructor() {
    this.callbacks = []
  }

  onChange(callback) {
    this.callbacks.push(callback)
  }

  set(object) {
    if (!object.id) {
      throw "Object without id!"
    }

    const newValue = JSON.stringify(object)
    const oldValue = localStorage.getItem(object.id)

    if (newValue!==oldValue) {
      localStorage.setItem(object.id, newValue)
      this.callbacks.forEach(c=>c(object.id))
    }
  }

  get(id) {
    const value = this.getItem(id);
    return value && JSON.parse(value)
  }

  remove(id) {
    localStorage.removeItem(id)
  }

  clean() {
    localStorage.clear()
  }
}
