import React from 'react'
import ReactDOM from 'react-dom'

window.jQuery = window.$ = require('jquery/dist/jquery.min')

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/js/bootstrap.js')

require('./main.less')

import Engine from '~/src/business/engine'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import {
  ON_TICK_DONE,
  ENGINE_LOAD_COMPONENT
} from '~/src/business/commands/commands'
import UiState from '~/src/business/ui_state'

import TickatorIDE from '~/src/ui/ide/tickator_ide'

const commandsDispatcher = new CommandsDispatcher()

const engine = new Engine(commandsDispatcher)

const uiState = new UiState(commandsDispatcher, render)

function render() {
  ReactDOM.render(
    <TickatorIDE uiState={uiState} commandsDispatcher={commandsDispatcher} engine={engine}/>,
    $("#root").get(0)
  );
}

engine.init()

commandsDispatcher.dispatch(ENGINE_LOAD_COMPONENT, {name: 'Iteration'})
