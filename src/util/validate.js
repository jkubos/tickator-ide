export default {
  notNull(value, message=null) {
    if (value===null || value===undefined) {
      throw message || "Expected non-null value"
    }
  },

  isNull(value, message=null) {
    if (value!==null && value!==undefined) {
      throw message || "Expected null value"
    }
  },

  notBlank(value, message=null) {
    if (typeof(value)!='string' || value.trim().length<=0) {
      throw message || `Expected non-blank value, got '${value}'`
    }
  },

  isFunction(value, message=null) {
    if (!(value instanceof Function)) {
      throw message || `Function expected, got '${value}'`
    }
  },

  isArray(value, message=null) {
    if (!(value instanceof Array)) {
      throw message || `Array expected, got '${value}'`
    }
  },

  isFunctionWithArity(value, arity, message=null) {
    if (!(value instanceof Function)) {
      throw message || `Function expected, got '${value}'`
    }

    if (value.length!==arity) {
      throw message || `Expected function with ${arity} parameters, got function with ${value.length}`
    }
  },

  isNumber(value, message=null) {
    if (typeof(value)!=='number') {
      throw message || `Expected number, got '${value}'`
    }
  },

  isA(value, type, message=null) {
    if (!(value instanceof type)) {
      throw message || `'${value}' is not instance of '${type}'`
    }
  },

  notSet(map, key, message=null) {
    if (map[key]!==undefined) {
      throw message || `Key ${key} is already set!`
    }
  }
}
