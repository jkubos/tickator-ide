import React from 'react'
import ReactDOM from 'react-dom'
import jquery from 'jquery'
import { createStore } from 'redux'
import deepFreeze from 'deep-freeze'

require("jquery")
require("bootstrap-webpack")
require("font-awesome/css/font-awesome.css")
require("./main.less");

import initData from './data'
import MainFrame from './components/main_frame'
import dynamicRenderingReducer from './reducers/dynamic_rendering'

/* ########################################################################## */
const registeredReducers = [
  dynamicRenderingReducer
]

function rootReducer(state, action) {
  if (action.type!='mouse.move') {
    console.log(action)
  }

  // let newState = {...state}

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

let store = createStore(rootReducer, initData)

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

// $(document).keydown(function(e){
//   if (e.ctrlKey) {
//     if (e.which==37) {
//     }
//   }
// })

render()
