import React from 'react'
import ReactDOM from 'react-dom'
import jquery from 'jquery'
require('expose?$!expose?jQuery!jquery')

import TickletRepository from './src/tickator/ticklet_repository'
import Dispatcher from './src/tickator/dispatcher'
import Ticklet from './src/tickator/ticklet'

import SumTicklet from './src/ticklets/sum'
import ConstTicklet from './src/ticklets/const'

import TickletDefinition from './src/ui/ticklet_definition'

const tickletRepository = new TickletRepository()

tickletRepository.add(SumTicklet)
tickletRepository.add(ConstTicklet)

const dispatcher = new Dispatcher()

window.setInterval(dispatcher.doTick.bind(dispatcher), 10)

ReactDOM.render(
  <div>
    {
      tickletRepository.definitions().map(def=><TickletDefinition def={def}/>)
    }
  </div>,
  $("#root").get(0)
);
