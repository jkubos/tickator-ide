import {observable} from 'mobx'

import {Validate} from '~/src/util/Validate'
import {Tools} from '~/src/util/Tools'

import {BusinessSpace} from './BusinessSpace'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'
import {TypeDefinition} from '~/src/tickator/definition/TypeDefinition'
import {WireDefinition} from '~/src/tickator/definition/WireDefinition'
import {InterfaceUsage} from '~/src/tickator/definition/InterfaceUsage'
import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'
import {ComponentImplementation} from '~/src/tickator/definition/ComponentImplementation'
import {TypeAssignment} from '~/src/tickator/definition/TypeAssignment'

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

  static fromJson(space, obj) {
    const res = new BusinessObject(space, obj.type, obj.uuid)

    res.bulkChange(()=>{
      Object.keys(obj.properties).forEach(name=>{
        res.setProperty(name, obj.properties[name])
      })
    })

    switch (res.type) {
      case "InterfaceDefinition":
        new InterfaceDefinition(res)
        break;

      case "TypeDefinition":
        new TypeDefinition(res)
        break;

      case "WireDefinition":
        new WireDefinition(res)
        break;

      case "InterfaceUsage":
        new InterfaceUsage(res)
        break;

      case "ComponentDefinition":
        new ComponentDefinition(res)
        break;

      case "ComponentImplementation":
        new ComponentImplementation(res)
        break;

      case "TypeAssignment":
        new TypeAssignment(res)
        break;

      default:
        throw `Unknown type '${res.type}'`
    }

    return res
  }

  constructor(space, type, uuid=undefined) {
    Validate.isA(space, BusinessSpace)
    Validate.notBlank(type)

    this._space = space

    this._type = type
    this._uuid = uuid || Tools.generateUUID()

    this._space.add(this)
  }

  loadRefs(obj) {

    this.bulkChange(()=>{
      Object.keys(obj.refs).forEach(name=>{
        obj.refs[name].forEach(uuid=>{
          this.addRef(name, this._space.get(uuid))
        })
      })
    })
  }

  toJson() {
    const refs = {}

    Object.keys(this._refs).forEach(name=>{
      refs[name] = this._refs[name].map(ref=>ref.uuid)
    })

    return JSON.stringify({
      uuid: this._uuid,
      type: this._type,
      properties: this._properties,
      refs
    })
  }

  get space() {
    return this._space
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
        this.validate()

        Object.keys(this._refs).forEach(name=>{
          this._refs[name].forEach(ref=>{
            ref.validate()
          })
        })

        this._backRefs.forEach(ref=>ref.validate())

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
    Validate.isA(object, BusinessObject)

    if (!this._refs[name] || !this._refs[name].includes(object)) {
      this.bulkChange(()=>{
        this._refs[name] = this._refs[name] || []

        this._refs[name].push(object)

        object._backRefs.push(this)
        object.validate()
        ++object._version

        this._backRefs.forEach(ref=>ref.validate())

        this._changeSignalized = true
      })
    }
  }

  removeRef(name) {

    this.bulkChange(()=>{
      const refs = this._refs[name] || []
      const origSize = refs.length

      refs.forEach(ref=>{
        //this is too generic
        ref._deleteBackRefs(this)
      })

      if (origSize>0) {
        this._refs[name] = []
        this._changeSignalized = true
      }
    })
  }

  getRefs(name) {
    Validate.valid(!this._deleted)
    Validate.notBlank(name)

    const makeDependency = this._version+1

    return (this._refs[name] || []).map(o=>o.owner)
  }

  delete() {
    Validate.valid(!this._deleted)

    this._space.remove(this)

    this._backRefs.forEach(bo=>bo._deleteRefs(this))

    Object.keys(this._refs).forEach(name=>{
      this._refs[name].forEach(ref=>{
        ref._deleteBackRefs(this)
      })
    })

    this._refs = []
    this._properties = []
    this._backRefs = []
    this._deleted = true
  }

  _deleteBackRefs(bo) {
    this.bulkChange(()=>{
      const sizeBefore = this._backRefs.length

      this._backRefs = this._backRefs.filter(ref=>ref!==bo)

      if (sizeBefore!==this._backRefs.length) {
        this._changeSignalized = true
      }
    })
  }

  _deleteRefs(bo) {
    this.bulkChange(()=>{
      Object.keys(this._refs).forEach(name=>{
        const sizeBefore = this._refs[name].length

        this._refs[name] = this._refs[name].filter(ref=>ref!==bo)

        this._changeSignalized = this._changeSignalized || this._refs[name].length!==sizeBefore
      })
    })
  }

  findBackRefs(klass) {
    return this._backRefs.filter(ref=>ref.owner instanceof klass).map(ref=>ref.owner)
  }

  findSingletonBackRef(klass) {
    const refs = this._backRefs.filter(ref=>ref.owner instanceof klass).map(ref=>ref.owner)
    Validate.ofSize(refs, 1)

    return refs[0]
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
