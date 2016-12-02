export const ticklets = [
  'sum',
  'const',
  'print',
  'line_input'
].map(file=>require('./'+file).default)
