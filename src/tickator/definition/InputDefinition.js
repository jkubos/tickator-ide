export class InputDefinition {
  constructor(nameVal, validatorVal, sideVal, ratioVal) {
    this.nameVal = nameVal
    this.validatorVal = validatorVal
    this.sideVal = sideVal
    this.ratioVal = ratioVal
  }

  name() {
    return this.nameVal
  }

  validator() {
    return this.validatorVal
  }

  side() {
    return this.sideVal
  }

  ratio() {
    return this.ratioVal
  }

  toDebug() {
    return {
      name: this.nameVal
    }
  }
}
