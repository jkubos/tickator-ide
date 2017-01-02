import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {
  b.instance(b=>{
    b.name('c1')
    b.component('org.tickator.test.SimpleSum')
    b.x(100)
    b.y(100)
  })
}
