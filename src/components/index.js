export const components = [
  'org/tickator/test/SimpleSum',
  'org/tickator/test/Iteration',
  'org/tickator/test/EmbedSimpleSum',
  'org/tickator/test/EmbeddedWrappedSum',
  'org/tickator/test/WrappedSum',
  'org/tickator/test/TestInput',
  'org/tickator/test/FibonacciGenerator',
  'org/tickator/core/ChainedRegisters'
].map(file=>{
  return {
    func: require('./'+file).defineFunction,
    path: file.split('/').slice(0, -1)
  }
})
