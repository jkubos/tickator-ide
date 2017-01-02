export const components = [
  'SimpleSum',
  'Iteration',
  'EmbedSimpleSum',
  'EmbeddedWrappedSum',
  'WrappedSum',
  'TestInput',
  'FibonacciGenerator',
  'ChainedRegisters'
].map(file=>require('./'+file).defineFunction)
