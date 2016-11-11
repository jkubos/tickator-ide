import React from 'react'
import ReactDOM from 'react-dom'
import jquery from 'jquery'
require('expose?$!expose?jQuery!jquery')

import TickletRepository from '~/src/tickator/definition/ticklet_repository'
import ComponentRepository from '~/src/tickator/definition/component_repository'
import Dispatcher from '~/src/tickator/dispatcher'

import {ticklets} from '~/src/tickator/ticklets/index'
import {components} from '~/src/components/index'

import TickletDescription from '~/src/ui/component/text/ticklet_description'
import ComponentDescription from '~/src/ui/component/text/component_description'
import ComponentSchema from '~/src/ui/component/graphic/component_schema'
import ConsoleView from '~/src/ui/ide/console_view'

import Component from '~/src/tickator/instance/component'

const tickletRepository = new TickletRepository()
ticklets.forEach(t=>tickletRepository.add(t))

const componentRepository = new ComponentRepository(tickletRepository)
componentRepository.addAll(components)

const dispatcher = new Dispatcher()

const rootInstance = new Component(dispatcher, componentRepository.get('Root'))
rootInstance.build()

const mainTickTimer = window.setInterval(()=>{
  dispatcher.doTick()

  if (dispatcher.currentTick>10) {
    clearInterval(mainTickTimer)
    dispatcher.log("STOP")
  }

  render()
}, 0)

function render() {
  ReactDOM.render(
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <ComponentSchema def={rootInstance.definition()} width={800} height={600}/>
            </td>
            <td>
              <ConsoleView width={400} height={600} lines={dispatcher.logLines()}/>
            </td>
          </tr>
        </tbody>
      </table>

      <hr/>

      {
        tickletRepository.definitions().map(def=><TickletDescription def={def} key={def.name()}/>)
      }
      {
        componentRepository.definitions().map(def=><ComponentDescription def={def} key={def.name()}/>)
      }
    </div>,
    $("#root").get(0)
  );
}
