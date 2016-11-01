import React from 'react'
import ComponentDefinition from '../tickator/component_definition'

export default class ComponentSchema extends React.Component {

  renderInstance(def) {
    return <g key={def.name()}>

      <rect
        x={def.x()}
        y={def.y()}
        width={100}
        height={150}
        rx="5"
        ry="5"
        style={{fill: '#444', strokeWidth: 2, stroke: 'black'}}>
      </rect>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Helvetica, Verdana"
        fontSize="14"
        fontWeight="bold"
        x={def.x()+100/2}
        y={def.y()+150/3}
        fill="white">
          {def.name()} : {def.definition().name()}
      </text>
    </g>
  }

  render() {
    return <svg
        style={{border: '1px solid gray', display: 'inline-block'}}
        width={this.props.width}
        height={this.props.height}
      >

      {this.props.def.instances().map(def=>this.renderInstance(def))}

      </svg>
  }

  getChildContext() {
    return {}
  }
}

ComponentSchema.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  def: React.PropTypes.instanceOf(ComponentDefinition).isRequired
}

ComponentSchema.defaultProps = {
}

ComponentSchema.childContextTypes = {
}
