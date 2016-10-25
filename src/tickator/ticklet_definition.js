export default class TickletDefinition {
  constructor(idVal, commentVal, inputsVal, outputsVal, propertiesVal, autostartVal=false) {
    this.idVal = idVal
    this.commentVal = commentVal
    this.inputsVal = inputsVal
    this.outputsVal = outputsVal
    this.propertiesVal = propertiesVal
    this.autostartVal = autostartVal
  }

  toDebug() {
    return {
        comment: this.commentVal,
        autostart: this.autostartVal,
        inputs: this.inputsVal.map(i=>i.toDebug()),
        outputs: this.outputsVal.map(o=>o.toDebug()),
        properties: this.propertiesVal.map(p=>p.toDebug())
    }
  }

  id() {
    return this.idVal
  }

  comment() {
    return this.commentVal
  }

  inputs() {
    return this.inputsVal
  }

  outputs() {
    return this.outputsVal
  }

  properties() {
    return this.propertiesVal
  }
}
