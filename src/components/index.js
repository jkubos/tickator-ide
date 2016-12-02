export const components = [
  'simple_sum',
  'iteration',
  'embed_simple_sum',
  'embedded_wrapped_sum',
  'wrapped_sum',
  'test_input'
].map(file=>require('./'+file).default)
