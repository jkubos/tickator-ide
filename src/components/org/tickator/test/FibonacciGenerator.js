
import {Validate} from '~/src/util/Validate'

export function defineFunction(b) {
  b.instance(b=>{
    b.name('regs')
    b.component('org.tickator.core.ChainedRegisters')
    b.property('value', 0)
    b.property('halfValue', 1)
    b.x(300)
    b.y(300)
    b.inputPosition('send', 'top', 0.5)
    b.inputPosition('in', 'bottom', 0.5)
    b.outputPosition('res', 'right', 0.3)
    b.outputPosition('half_res', 'right', 0.7)
  })

  b.instance(b=>{
    b.name('starter')
    b.ticklet('Const')
    b.property('value', 1)
    b.x(100)
    b.y(100)
  })

  b.instance(b=>{
    b.name('s')
    b.ticklet('Sum')
    b.x(650)
    b.y(300)
  })

  b.instance(b=>{
    b.name('p')
    b.ticklet('Print')
    b.x(500)
    b.y(200)
  })

  b.instance(b=>{
    b.name('f')
    b.ticklet('PriorityFunnel')
    b.x(300)
    b.y(100)
    b.inputPosition('prior', 'left', 0.5)
    b.inputPosition('other', 'right', 0.5)
    b.outputPosition('res', 'bottom', 0.5)
  })

  b.connect(b=>{
    b.fromInstance('regs')
    b.fromOutput('res')
    b.toInstance('p')
    b.toInput('val')
  })

  b.connect(b=>{
    b.fromInstance('regs')
    b.fromOutput('res')
    b.toInstance('s')
    b.toInput('a')
  })

  b.connect(b=>{
    b.fromInstance('regs')
    b.fromOutput('half_res')
    b.toInstance('s')
    b.toInput('b')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('regs')
    b.toInput('in')
  })

  b.connect(b=>{
    b.fromInstance('starter')
    b.fromOutput('res')
    b.toInstance('f')
    b.toInput('prior')
  })

  b.connect(b=>{
    b.fromInstance('f')
    b.fromOutput('res')
    b.toInstance('regs')
    b.toInput('send')
  })

  b.connect(b=>{
    b.fromInstance('s')
    b.fromOutput('res')
    b.toInstance('f')
    b.toInput('other')
  })

  b.property(b=>{
    b.name('maxValue')
    b.defaultValue(1000000)
  })
}
