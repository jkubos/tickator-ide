import {toCamelCase, capitalize} from '~/src/util/Tools'

export const ticklets = [
  'Sum',
  'Const',
  'Print',
  'LineInput',
  'Register',
  'PriorityFunnel'
].map(file=>require('./'+file)[capitalize(toCamelCase(file))])
