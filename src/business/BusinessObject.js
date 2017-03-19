import {observable} from 'mobx'

import {Validate} from '~/src/util/Validate'
import {Tools} from '~/src/util/Tools'

export class BusinessObject {

  @observable _version = 0

  _properties = {}

  _refs = {}

  _backRefs = []

  _validators = []

  _propertyProblems = {}
  _refProblems = {}

  _valid = true

  static definePropertyAccessors(object, businessObject, name) {
    Object.defineProperty(object, name, {
      get: ()=>businessObject.getProperty(name),
      set: (value)=>businessObject.setProperty(name, value)
    })

    Object.defineProperty(object, name+"IsValid", {
      get: ()=>businessObject.isValidProperty(name)
    })

    Object.defineProperty(object, name+"Problems", {
      get: ()=>businessObject.getPropertyProblems(name)
    })
  }

  static defineRefsAccessors(object, businessObject, name) {
    Object.defineProperty(object, "refs"+(name.charAt(0).toUpperCase() + name.slice(1)), {
      get: ()=>businessObject.getRefs(name)
    })

    Object.defineProperty(object, "ref"+(name.charAt(0).toUpperCase() + name.slice(1)), {
      get: ()=>{
        Validate.ofSize(businessObject.getRefs(name), 1)
        return businessObject.getRefs(name)[0]
      }
    })
  }

  constructor(type, uuid=undefined) {
    Validate.notBlank(type)

    this._type = type
    this._uuid = uuid || Tools.generateUUID()
  }

  get owner() {
    Validate.valid(!this._deleted)
    Validate.notNull(this._owner)

    return this._owner
  }

  set owner(value) {
    Validate.valid(!this._deleted)
    Validate.notNull(value)
    Validate.isNull(this._owner)

    this._owner = value
  }

  get uuid() {
    Validate.valid(!this._deleted)
    return this._uuid
  }

  get type() {
    Validate.valid(!this._deleted)
    return this._type
  }

  get valid() {
    Validate.valid(!this._deleted)
    const makeDependency = this._version+1

    return this._valid
  }

  bulkChange(block) {
    Validate.valid(!this._deleted)
    Validate.isFunctionWithArity(block, 0)

    if (this._inBulkChange) {
      block()
    } else {
      this._inBulkChange = true
      this._changeSignalized = false

      block()

      if (this._changeSignalized) {
        //mobx signal
        ++this._version
      }

      this._inBulkChange = false
    }
  }

  validate() {
    Validate.valid(!this._deleted)
    this._propertyProblems = {}
    this._refProblems = {}
    this._validators.forEach(validator=>validator())

    const valid = Object.keys(this._propertyProblems).length==0 && Object.keys(this._refProblems).length==0

    if (this._valid!==valid) {
      this.bulkChange(()=>{
        this._valid = valid
        this._changeSignalized = true
      })
    }
  }

  addPropertyProblem(name, message) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    this._propertyProblems[name] = this._propertyProblems[name] || []
    this._propertyProblems[name].push(message)
  }

  addRefProblem(name, message) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    this._refProblems[name] = this._refProblems[name] || []
    this._refProblems[name].push(message)
  }

  addValidator(validator) {
    Validate.valid(!this._deleted)
    Validate.isFunctionWithArity(validator, 0)

    if (!this._validators.includes(validator)) {
      this._validators.push(validator)
    }
  }

  setProperty(name, value) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    if (this._properties[name] !== value) {
      this.bulkChange(()=>{
        this._changeSignalized = true

        this._properties[name] = value

        // this._backRefs.forEach(ref=>ref.onRefChanged())

        this.validate()
      })
    }
  }

  getProperty(name) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    const makeDependency = this._version+1

    return this._properties[name]
  }

  getPropertyProblems(name) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    const makeDependency = this._version+1

    return this._propertyProblems[name] || []
  }

  isValidProperty(name) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    const makeDependency = this._version+1

    return this._propertyProblems[name]===undefined
  }

  addRef(name, object) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)
    Validate.notNull(object)
    Validate.isA(object.businessObject, BusinessObject)

    if (!this._refs[name] || !this._refs[name].includes(object.businessObject)) {
      this.bulkChange(()=>{
        this._refs[name] = this._refs[name] || []

        this._refs[name].push(object.businessObject)

        object.businessObject._backRefs.push(this)
        ++object.businessObject._version

        this._backRefs.forEach(ref=>ref.validate())

        this._changeSignalized = true
      })
    }
  }

  getRefs(name) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    const makeDependency = this._version+1

    return (this._refs[name] || []).map(o=>o.owner)
  }

  delete() {
    Validate.valid(!this._deleted)

    this._backRefs.forEach(bo=>bo.deleteRefs(this))

    Object.keys(this._refs).forEach(name=>{
      this._refs[name].forEach(ref=>{
        ref.deleteBackRefs(this)
      })
    })

    this._refs = []
    this._properties = []
    this._backRefs = []
    this._deleted = true
  }

  deleteBackRefs(bo) {
    this.bulkChange(()=>{
      const sizeBefore = this._backRefs.length

      this._backRefs = this._backRefs.filter(ref=>ref!==bo)

      if (sizeBefore!==this._backRefs.length) {
        this._changeSignalized = true
      }
    })
  }

  deleteRefs(bo) {
    this.bulkChange(()=>{
      Object.keys(this._refs).forEach(name=>{
        console.log(name);

        const sizeBefore = this._refs[name].length

        this._refs[name] = this._refs[name].filter(ref=>ref!==bo)

        this._changeSignalized = this._changeSignalized || this._refs[name].length!==sizeBefore
      })
    })
  }

  findBackRefs(klass) {
    return this._backRefs.filter(ref=>ref.owner instanceof klass).map(ref=>ref.owner)
  }

  problems() {
    const res = []

    Object.keys(this._propertyProblems).forEach(name=>{
      this._propertyProblems[name].forEach(problem=>{
        res.push({type: 'property', name, problem, businessType: this.type})
      })
    })

    Object.keys(this._refProblems).forEach(name=>{
      this._refProblems[name].forEach(problem=>{
        res.push({type: 'ref', name, problem, businessType: this.type})
      })
    })

    return res
  }

  observe() {
    const makeDependency = this._version+1
  }
}
