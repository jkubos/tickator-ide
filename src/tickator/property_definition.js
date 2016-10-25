export default class PropertyDefinition {
  constructor(nameVal) {
    this.nameVal = nameVal
  }

  name() {
    return this.nameVal
  }

  toDebug() {
    return {
      name: this.nameVal
    }
  }
}
