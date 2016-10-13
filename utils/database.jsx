
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

export default class Database {
  constructor() {
    this.dirty = false
  }

  set(id, object) {
    this.dirty = true
    localStorage.setObject(id, object)
  }

  get(id) {
    localStorage.getObject(id)
  }

  remove(id) {
    this.dirty = true
    localStorage.removeItem(id)
  }

  clean() {
    this.dirty = true
    localStorage.clear()
  }

  isDirty() {
      return this.dirty
  }

  undirty() {
    this.dirty = false
  }
}
