import React from 'react'
import ReactDOM from 'react-dom'

const jQuery = require('jquery/dist/jquery.min')

require('./src/style/main.css')

import {UiState} from '~/src/business/UiState'
import {Definitions} from '~/src/business/Definitions'

import {IDE} from '~/src/ui/pages/ide'

const definitions = new Definitions()
const uiState = new UiState(definitions)

ReactDOM.render(
  <IDE uiState={uiState} definitions={definitions}/>,
  jQuery("#reactRoot").get(0)
);
