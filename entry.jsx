import React from 'react'
import ReactDOM from 'react-dom'

window.jQuery = window.$ = require('jquery/dist/jquery.min')

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/js/bootstrap.js')

require('./main.less')

import TickletRepository from '~/src/tickator/definition/ticklet_repository'
import ComponentRepository from '~/src/tickator/definition/component_repository'
import Dispatcher from '~/src/tickator/dispatcher'

import {ticklets} from '~/src/tickator/ticklets/index'
import {components} from '~/src/components/index'

import ComponentSchema from '~/src/ui/component/graphic/component_schema'
import ConsoleView from '~/src/ui/ide/console_view'
import Toolbar from '~/src/ui/ide/toolbar'

import Component from '~/src/tickator/instance/component'

const tickletRepository = new TickletRepository()
ticklets.forEach(t=>tickletRepository.add(t))

const componentRepository = new ComponentRepository(tickletRepository)
componentRepository.addAll(components)

const dispatcher = new Dispatcher()

const rootInstance = new Component(dispatcher, componentRepository.get('Iteration'))
rootInstance.build()

const mainTickTimer = window.setInterval(()=>{
  dispatcher.doTick()

  if (dispatcher.currentTick()>20) {
    clearInterval(mainTickTimer)
    dispatcher.log("STOP")
  }

  render()
}, 0)

function render() {
  ReactDOM.render(
    <div className="container container-full">
      <Toolbar />

      <div className="row">
        <div className="col-lg-2">
          TREE
        </div>
        <div className="col-md-10">
          <ComponentSchema def={rootInstance.definition()} width={800} height={600}/>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <ConsoleView lines={dispatcher.logLines()}/>
        </div>
      </div>
    </div>,
    $("#root").get(0)
  );
}
