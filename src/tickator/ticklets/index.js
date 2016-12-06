export const ticklets = [
  'sum',
  'const',
  'print',
  'line_input',
  'register',
  'priority_funnel'
].map(file=>require('./'+file).default)
