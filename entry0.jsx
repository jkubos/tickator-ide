import React from 'react'
import ReactDOM from 'react-dom'
import jquery from 'jquery'
import { createStore } from 'redux'

require('expose?$!expose?jQuery!jquery')
require("./main.less");

import {initData, fillDatabase} from './src/db/data'
import MainFrame from './components/main_frame'
import dynamicRenderingReducer from './reducers/dynamic_rendering'

import Database from './src/db/database'

import {ACTION} from './src/const/action'
import {DB_CONST} from './src/const/db'

import {reduce as NamespaceReducer} from './src/reducer/namespace'

import {generateUUID} from './src/util/tools'

const db = new Database()
fillDatabase(db)

/* ########################################################################## */
const registeredReducers = [
  dynamicRenderingReducer,
  NamespaceReducer
]

function rootReducer(state, action) {
  if (action.type!='mouse.move') {
    console.log(action)
  }

  let newState = JSON.parse(JSON.stringify(state))

  registeredReducers.forEach(reducer=>{
    newState = reducer(newState, action)
  })

  if (JSON.stringify(newState)!==JSON.stringify(state)) {
    console.log(newState)
  }

  return newState
}
/* ########################################################################## */

let store = createStore(rootReducer, initData())

function render() {
  ReactDOM.render(
    <MainFrame
      width={$(window).width()}
      height={$(window).height()}
      store={store}
      />,
    $("#root").get(0)
  );
}

store.subscribe(() =>
  render()
)

$(window).resize(e=>render())

store.dispatch({
  type: ACTION.ADD_NAMESPACE_NODE,
  id: DB_CONST.ROOT_NAMESPACE_ID,
  uuid: generateUUID()
})

store.dispatch({
  type: ACTION.ADD_NAMESPACE_NODE,
  id: DB_CONST.ROOT_NAMESPACE_ID,
  uuid: generateUUID()
})

// $(document).keydown(function(e){
//   if (e.ctrlKey) {
//     if (e.which==37) {
//     }
//   }
// })

render()
