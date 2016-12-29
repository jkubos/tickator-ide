import React from 'react'
import ReactDOM from 'react-dom'

const jQuery = require('jquery/dist/jquery.min')

require('./src/style/main.css')

import {Engine} from '~/src/business/engine'
import {UiState} from '~/src/business/ui_state'
import {Definitions} from '~/src/business/definitions'

import {IDE} from '~/src/ui/pages/ide'

const definitions = new Definitions()
const engine = new Engine(definitions)
const uiState = new UiState(definitions, engine)

ReactDOM.render(
  <IDE uiState={uiState} engine={engine} definitions={definitions}/>,
  jQuery("#reactRoot").get(0)
);
