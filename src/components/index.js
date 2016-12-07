export const components = [
  'simple_sum',
  'iteration',
  'embed_simple_sum',
  'embedded_wrapped_sum',
  'wrapped_sum',
  'test_input',
  'fibonacci_generator',
  'chained_registers'
].map(file=>require('./'+file).default)
