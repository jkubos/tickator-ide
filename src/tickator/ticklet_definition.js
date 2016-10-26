export default class TickletDefinition {
  constructor(nameVal, commentVal, inputsVal, outputsVal, propertiesVal, autostartVal=false) {
    this.nameVal = nameVal
    this.commentVal = commentVal
    this.inputsVal = inputsVal
    this.outputsVal = outputsVal
    this.propertiesVal = propertiesVal
    this.autostartVal = autostartVal
  }

  toDebug() {
    return {
        name: this.nameVal,
        comment: this.commentVal,
        autostart: this.autostartVal,
        inputs: this.inputsVal.map(i=>i.toDebug()),
        outputs: this.outputsVal.map(o=>o.toDebug()),
        properties: this.propertiesVal.map(p=>p.toDebug())
    }
  }

  name() {
    return this.nameVal
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
