import Validate from '~/src/util/validate'

export default function defineFunction(b) {
  b.name('EmbedSimpleSum')

  b.instance(b=>{
    b.name('c1')
    b.component('SimpleSum')
    b.x(100)
    b.y(100)
  })
}
