export const ticklets = [
  'Sum',
  'Const',
  'Print',
  'LineInput',
  'Register',
  'PriorityFunnel',
  'ValueDetector',
  'StringIterator',
  'Countdown',
  'WaitForAll',
  'SelectAny',
  'Multiply',
  'PassFirst'
].map(file=>require('./'+file)[file])
