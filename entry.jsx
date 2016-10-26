import React from 'react'
import ReactDOM from 'react-dom'
import jquery from 'jquery'
require('expose?$!expose?jQuery!jquery')

import TickletRepository from './src/tickator/ticklet_repository'
import ComponentRepository from './src/tickator/component_repository'
import Dispatcher from './src/tickator/dispatcher'

import {ticklets} from './src/ticklets/index'
import {components} from './src/components/index'

import TickletDefinition from './src/ui/ticklet_definition'

const tickletRepository = new TickletRepository()
ticklets.forEach(t=>tickletRepository.add(t))

const componentRepository = new ComponentRepository(tickletRepository)
componentRepository.addAll(components)

const dispatcher = new Dispatcher()

window.setInterval(dispatcher.doTick.bind(dispatcher), 10)

ReactDOM.render(
  <div>
    {
      tickletRepository.definitions().map(def=><TickletDefinition def={def} key={def.name()}/>)
    }
  </div>,
  $("#root").get(0)
);
