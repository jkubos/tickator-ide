export default class OutputDefinition {
  constructor(nameVal, validatorVal) {
    this.nameVal = nameVal
    this.validatorVal = validatorVal
  }

  name() {
    return this.nameVal
  }

  validator() {
    return this.validatorVal
  }

  toDebug() {
    return {
      name: this.nameVal
    }
  }
}
