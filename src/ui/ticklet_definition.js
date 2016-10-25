import React from 'react';

export default class TickletDefinition extends React.Component {
  render() {
    return <div>
        <h1>{this.props.def.id()}</h1>

        Inputs:
        <ul>
          {this.props.def.inputs().map(i=><li>{i.name()}</li>)}
        </ul>

        Outputs:
        <ul>
          {this.props.def.outputs().map(o=><li>{o.name()}</li>)}
        </ul>

        Properties:
        <ul>
          {this.props.def.properties().map(p=><li>{p.name()}</li>)}          
        </ul>
      </div>;
  }

  getChildContext() {
    return {};
  }
}

TickletDefinition.propTypes = {
};

TickletDefinition.defaultProps = {
};

TickletDefinition.childContextTypes = {
};
