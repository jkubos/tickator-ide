import React from 'react';
import {observer} from 'mobx-react'
import {InstanceDefinition} from '~/src/tickator/definition/InstanceDefinition'
import {Pin} from './Pin'
import {UiState} from '~/src/business/UiState'

@observer
export class Unit extends React.Component {

  static propTypes = {
    def: React.PropTypes.instanceOf(InstanceDefinition).isRequired,
    geom: React.PropTypes.object.isRequired,
    selected: React.PropTypes.bool.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {

    return <g
        onClick={e=>this.context.uiState.currentContextStore.selectInstance(this.props.def.name())}
        onDoubleClick={e=> {
          if (this.props.def.definition().type()!=='ticklet') {
            this.context.uiState.currentContextStore.drillDown(this.props.def.name())
          }
        }}
      >

      <rect
        x={this.props.geom.bbox.x}
        y={this.props.geom.bbox.y}
        width={this.props.geom.bbox.width}
        height={this.props.geom.bbox.height}
        rx="5"
        ry="5"
        style={{
          fill: this.props.def.definition().type()==='ticklet' ? '#859900' : '#268BD2' ,
          strokeWidth: 2,
          stroke: this.props.selected ? '#cb4b16' : '#586e75'
        }}
        >
          <title>{this.props.def.definition().comment()}</title>
      </rect>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Helvetica, Verdana"
        fontSize="12"
        fontWeight="bold"
        x={this.props.geom.bbox.x+this.props.geom.bbox.width/2}
        y={this.props.geom.bbox.y+this.props.geom.bbox.height/3}
        fill="white">
          {this.props.def.name()}
          <title>{this.props.def.definition().comment()}</title>
      </text>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Helvetica, Verdana"
        fontSize="8"
        fontWeight="bold"
        x={this.props.geom.bbox.x+this.props.geom.bbox.width/2}
        y={this.props.geom.bbox.y+this.props.geom.bbox.height/3+15}
        fill="white">
          {this.props.def.definition().name()}
          <title>{this.props.def.definition().comment()}</title>
      </text>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="FontAwesome"
        fontSize="15"
        fontWeight="bold"
        x={this.props.geom.bbox.x+this.props.geom.bbox.width-12}
        y={this.props.geom.bbox.y+12}
        fill="#586e75">
          {this.props.def.definition().type()==='ticklet' ? "\uf013" : "\uf12e"}
          <title>{this.props.def.definition().comment()}</title>
      </text>

      {this.props.def.definition().inputs().map(i=><Pin
        key={i.name()}
        def={i}
        geom={this.props.geom.inputs[i.name()]}
        isOnRoot={false}
        />)
      }

      {this.props.def.definition().outputs().map(o=><Pin
        key={o.name()}
        def={o}
        geom={this.props.geom.outputs[o.name()]}
        isOnRoot={false}
        />)
      }
    </g>
  }
}
