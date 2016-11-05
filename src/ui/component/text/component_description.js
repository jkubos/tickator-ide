import React from 'react';

export default class ComponentDescription extends React.Component {
  render() {
    return <div style={{border: '1px solid gray', display: 'inline-block', margin: 5, padding: 5, background: '#f88'}}>
        <h3>{this.props.def.name()}</h3>

        <p>{this.props.def.comment()}</p>

        Inputs:
        <ul>
          {this.props.def.inputs().map(i=><li key={i.name()}>{i.name()}</li>)}
        </ul>

        Outputs:
        <ul>
          {this.props.def.outputs().map(o=><li key={o.name()}>{o.name()}</li>)}
        </ul>

        Properties:
        <ul>
          {this.props.def.properties().map(p=><li key={p.name()}>{p.name()}</li>)}
        </ul>

        Instances:
        <ul>
          {this.props.def.instances().map(i=><li key={i.name()}>{i.name()} : {i.definition().type()} {i.definition().name()}</li>)}
        </ul>
      </div>
  }

  getChildContext() {
    return {}
  }
}

ComponentDescription.propTypes = {
}

ComponentDescription.defaultProps = {
}

ComponentDescription.childContextTypes = {
}
