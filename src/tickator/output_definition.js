export default class OutputDefinition {
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

  ratioVal() {
    return this.ratioVal
  }

  toDebug() {
    return {
      name: this.nameVal
    }
  }
}
