import React from 'react'
import ReactDOM from 'react-dom'

window.jQuery = window.$ = require('jquery/dist/jquery.min')

// require('bootstrap/dist/css/bootstrap.css')
// require('bootstrap/dist/js/bootstrap.js')

require('./src/style/main.css')

import Engine from '~/src/business/engine'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {
  ENGINE_LOAD_COMPONENT,
  ENGINE_RUN
} from '~/src/business/commands/commands'
import UiState from '~/src/business/ui_state'

import IDE from '~/src/ui/pages/ide'

const commandsDispatcher = new CommandsDispatcher()

const engine = new Engine(commandsDispatcher)

const uiState = new UiState(commandsDispatcher, render)

function render() {
  ReactDOM.render(
    <IDE uiState={uiState} commandsDispatcher={commandsDispatcher} engine={engine}/>,
    $("#reactRoot").get(0)
  );
}

engine.init()

//commandsDispatcher.dispatch(ENGINE_LOAD_COMPONENT, {name: 'SimpleSum'})
//commandsDispatcher.dispatch(ENGINE_RUN, {})
