import React from 'react'
import deepEqual from 'deep-equal'

export default class ConsoleView extends React.Component {

  constructor() {
    super()
    this.padding = "\u00a0\u00a0\u00a0\u00a0"
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(this.props, nextProps, true)
  }

  render() {
    return <div
      ref='topDiv'
      style={{
        border: '1px solid gray',
        background: '#002b36',
        color: '#859900',
        padding: 3,
        overflow: 'auto',
        fontFamily: 'monospace',
        minHeight: 300,
        maxHeight: 300
      }}
    >
      {this.props.lines.map((line, i)=><div key={i}>
        <span style={{fontWeight: 'bold', color: '#b58900'}}>
          {i-1>=0 && this.props.lines[i-1].tick===line.tick ? this.padding : this.getPaddedTimestamp(line.tick)}
        </span>
        &nbsp;
        {line.message}
      </div>)}
    </div>
  }

  getPaddedTimestamp(ts) {
    const val = ''+ts
    const zeroPadding = Array(this.padding.length+1).join('0')
    return zeroPadding.substring(0, zeroPadding.length - val.length) + val
  }

  getChildContext() {
    return {}
  }

  componentWillUpdate() {
    const node = this.refs.topDiv;

    this.shouldScrollBottom = Math.abs((node.scrollTop + node.offsetHeight) - node.scrollHeight)<10;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      const node = this.refs.topDiv;
      node.scrollTop = node.scrollHeight
    }
  }
}

ConsoleView.propTypes = {
  lines: React.PropTypes.array.isRequired
}

ConsoleView.defaultProps = {
}

ConsoleView.childContextTypes = {
}
