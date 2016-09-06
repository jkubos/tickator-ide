import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import Dispatcher from './utils/dispatcher';

require("jquery")
require("bootstrap-webpack")
require("font-awesome/css/font-awesome.css")
require("./main.less");

import MainFrame from './components/main_frame'

var dispatcher = new Dispatcher();

const render = () => {
  ReactDOM.render(
    <MainFrame
      width={$(window).width()}
      height={$(window).height()}
      dispatcher={dispatcher}
      />,
    $("#root").get(0)
  );
}

dispatcher.onChange(()=>render())

$(window).resize(e=>render())

$(document).keydown(function(e){
  if (e.ctrlKey) {
    if (e.which==37) {
    }
  }
})

render()
