import React from 'react'
import ReactDOM from 'react-dom'

const jQuery = require('jquery/dist/jquery.min')

require('./src/style/main.less')

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
// import {Definitions} from '~/src/business/Definitions'

import {IDE} from '~/src/ui/page/Ide'

// const definitions = new Definitions()
const uiState = new UiState(/*definitions*/)

const businessSpace = new BusinessSpace()

window.addEventListener("contextmenu", e=>e.preventDefault())
//definitions={definitions}
ReactDOM.render(
  <IDE uiState={uiState} space={businessSpace} />,
  jQuery("#reactRoot").get(0)
);
