export const components = [
  'org/tickator/test/SimpleSum',
  'org/tickator/test/Iteration',
  'org/tickator/test/EmbedSimpleSum',
  'org/tickator/test/EmbeddedWrappedSum',
  'org/tickator/test/WrappedSum',
  'org/tickator/test/TestInput',
  'org/tickator/test/FibonacciGenerator',
  'org/tickator/test/calculator/Calculator',
  'org/tickator/test/calculator/Engine',
  'org/tickator/core/ChainedRegisters',
  'org/tickator/core/NumberCharDetector',
  'org/tickator/core/OperatorCharDetector'
].map(file=>{
  const parts = file.split('/')

  return {
    func: require('./'+file).defineFunction,
    path: parts.slice(0, -1),
    name: parts[parts.length-1]
  }
})
