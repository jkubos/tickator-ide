export default class ComponentDefinition {
  constructor(nameVal) {
    this.nameVal = nameVal
  }

  name() {
    return this.nameVal
  }

  comment() {
    return 'todo'
  }

  inputs() {
    return []
  }

  outputs() {
    return []
  }

  properties() {
    return []
  }

  toDebug() {
    return {
      name: this.nameVal
    }
  }
}
