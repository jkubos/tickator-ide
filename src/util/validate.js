export class Validate {
  static notNull(value, message=null) {
    if (value===null || value===undefined) {
      throw message || "Expected non-null value"
    }
  }

  static isNull(value, message=null) {
    if (value!==null && value!==undefined) {
      throw message || "Expected null value"
    }
  }

  static notBlank(value, message=null) {
    if (typeof(value)!='string' || value.trim().length<=0) {
      throw message || `Expected non-blank value, got '${value}'`
    }
  }

  static isFunction(value, message=null) {
    if (!(value instanceof Function)) {
      throw message || `Function expected, got '${value}'`
    }
  }

  static isArray(value, message=null) {
    if (!(value instanceof Array)) {
      throw message || `Array expected, got '${value}'`
    }
  }

  static isFunctionWithArity(value, arity, message=null) {
    if (!(value instanceof Function)) {
      throw message || `Function expected, got '${value}'`
    }

    if (value.length!==arity) {
      throw message || `Expected function with ${arity} parameters, got function with ${value.length}`
    }
  }

  static isNumber(value, message=null) {
    if (typeof(value)!=='number') {
      throw message || `Expected number, got '${value}'`
    }
  }

  static isString(value, message=null) {
    if (typeof(value)!=='string') {
      throw message || `Expected string, got '${value}'`
    }
  }

  static isA(value, type, message=null) {
    if (!(value instanceof type)) {
      throw message || `'${value}' is not instance of '${type}'`
    }
  }

  static isAnyOfA(value, types, message=null) {
    if (types.every(type=>!(value instanceof type))) {
      throw message || `'${value}' is not instance of '${types}'`
    }
  }

  static notSet(map, key, message=null) {
    if (map[key]!==undefined) {
      throw message || `Key '${key}' is already set!`
    }
  }

  static isSet(map, key, message=null) {
    if (map[key]===undefined) {
      throw message || `Key '${key}' is not set!`
    }
  }

  static valid(value, message=null) {
    if (value===false) {
      throw message || `Not valid!`
    } else if (value!==true) {
      throw `Excpected boolean, get '${value}'`
    }
  }

  static oneSet(arr, message=null) {
    if (!(arr instanceof Array)) {
      throw `Array expected, got '${arr}'`
    }

    if (arr.filter(i=>i!==null && i!==undefined).length!=1) {
      throw `Exactly one should be set, but got '${arr}'`
    }
  }

  static oneOf(value, options, message=null) {
    if (!(options instanceof Array)) {
        throw `Array expected, got '${options}'`
    }

    if (!options.includes(value)) {
      throw message || `Expected one of ${options} but got '${value}'`
    }
  }

  static numberInRangeIncl(value, fromIncl, toIncl, message=null) {
    if (typeof(value)!=='number') {
      throw `Expected number as value, got '${value}'`
    }

    if (typeof(fromIncl)!=='number') {
      throw `Expected number as from, got '${fromIncl}'`
    }

    if (typeof(toIncl)!=='number') {
      throw `Expected number as to, got '${toIncl}'`
    }

    if (fromIncl>toIncl) {
      throw `From should be less or equal than to, got from '${fromIncl}' to '${toIncl}'`
    }

    if (value<fromIncl || value>toIncl) {
      throw message || `Value '${value}' out of expected range '${fromIncl}' to '${toIncl}'`
    }
  }

  static isGreaterThanZero(value, message=null) {
    if (typeof(value)!=='number') {
      throw `Expected number as value, got '${value}'`
    }

    if (value<=0) {
      throw message || `Value '${value}' should be >0`
    }
  }

  static notContained(array, item, message=null) {
    if (array.includes(item)) {
      throw message || `Item ${item} already contained!`
    }
  }

  static extends(value, klass, message=null) {
    if (!(value.prototype instanceof klass)) {
      throw message || `Expected instance of ${klass} but got ${value}`
    }
  }

  static ofSize(array, size, message=null) {
    if (array.length!==size) {
      throw message || `Expected array of size ${size} but got ${array.length}`
    }
  }

  static notEmpty(array, message=null) {
    if (array.length<=0) {
      throw message || `Expected non empty array`
    }
  }
}
