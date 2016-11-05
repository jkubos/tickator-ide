import React from 'react';

export default class ConsoleView extends React.Component {
  render() {
    return <div
      style={{
        border: '1px solid gray',
        display: 'inline-block',
        background: '#002b36',
        color: '#859900',
        width: this.props.width,
        height: this.props.height,
        padding: 3,
        margin: 10
      }}
    >
      {this.props.lines.map((line, i)=><div key={i}>
        <span style={{fontWeight: 'bold', color: '#b58900'}}>&gt;&gt; </span>
        {line}
      </div>)}
    </div>
  }

  getChildContext() {
    return {}
  }
}

ConsoleView.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  lines: React.PropTypes.array.isRequired
}

ConsoleView.defaultProps = {
}

ConsoleView.childContextTypes = {
}
