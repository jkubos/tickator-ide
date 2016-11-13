import React from 'react'
import ReactDOM from 'react-dom'

window.jQuery = window.$ = require('jquery/dist/jquery.min')

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/js/bootstrap.js')

require('./main.less')

import Engine from '~/src/business/engine'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {ON_TICK_DONE} from '~/src/business/commands/commands'

import ComponentSchema from '~/src/ui/component/graphic/component_schema'
import ConsoleView from '~/src/ui/ide/console_view'
import Toolbar from '~/src/ui/ide/toolbar'

const commandsDispatcher = new CommandsDispatcher()

const engine = new Engine(commandsDispatcher)

commandsDispatcher.register(ON_TICK_DONE, data=>render())

function render() {
  ReactDOM.render(
    <div className="container container-full">
      <Toolbar commandsDispatcher={commandsDispatcher}/>

      <div className="row">
        <div className="col-lg-2">
          TREE
        </div>
        <div className="col-md-10">
          <ComponentSchema def={engine.rootInstance().definition()} width={800} height={600}/>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <ConsoleView lines={engine.dispatcher().logLines()}/>
        </div>
      </div>
    </div>,
    $("#root").get(0)
  );
}

render()
