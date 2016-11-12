import React from 'react'
import deepEqual from 'deep-equal'

export default class Toolbar extends React.Component {

  render() {
    return <nav className="navbar navbar-default">
      <div className="navbar-header">
        <span className="navbar-brand">Tickator</span>
      </div>
      <div className="container">
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  }

  getChildContext() {
    return {}
  }
}

Toolbar.propTypes = {
}

Toolbar.defaultProps = {
}

Toolbar.childContextTypes = {
}
