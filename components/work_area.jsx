import React from 'react';

import {Component} from "./component"
import Wire from "./wire"

import BitArrayVisualization from "./bit_array_visualization"
import GeometryCalculator from "../geom/geometry_calculator"
import Point from "../geom/point"
import Line from "../geom/line"

export class WorkArea extends React.Component {

  constructor() {
    super()
    this._geomCalculator = new GeometryCalculator()
  }

  render() {
    this._geometry = this._geomCalculator.recalculate(this.props.size, this.props.data)

    const components = this.props.data.components.map(comp=>{
      return <Component
        data={comp}
        geometry={this._geometry}
        key={comp.id}/>
    })

    const wires = this.props.data.wires.map(wire=>{
      return <Wire
        wire={wire}
        geometry={this._geometry[wire.id]}
        key={wire.id}/>
    })

    return <div className='work-area' style={{
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none"}}
        >

      <svg
        width={this.props.size.width}
        height={this.props.size.height}
        viewBox={"0 0 "+this.props.size.width+" "+this.props.size.height}
        style={{background: "white"}}
        ref={element=>this._element=element}
        onMouseDown={e=>this._onMouseEvent("mouse.down", e)}
        onMouseUp={e=>this._onMouseEvent("mouse.up", e)}
        onMouseMove={e=>this._onMouseEvent("mouse.move", e)} >

        {wires}
        {components}
        {/*<BitArrayVisualization array={this._geomCalculator._bitArray}/>*/}

      </svg>
    </div>
  }

  _onMouseEvent(command, e) {
    const point = this._clickPoint(e)
    const selectedObjects = this._findSelectedObjects(point)

    this.context.dispatcher.dispatch({
      command: command,
      selectedObjects: selectedObjects,
      position: point
    });
  }

  _findSelectedObjects(position) {
    const res = []

    Object.keys(this._geometry).forEach((k, v)=>{
      const g = this._geometry[k]

      if (g.type=="component") {
        if (g.bbox.contains(position)) {
          res.push({
            id: k,
            type: g.type,
            semantics: 'body'
          })
        }
      } else if (g.type=="pin") {
        if (g.head.distanceTo(position)<=g.radius+5) {
          res.push({
            id: k,
            type: g.type,
            semantics: 'head'
          })
        }
      } else if (g.type=="wire") {
        if (g.points.length>=2) {
          if (g.points[0].distanceTo(position)<=10) {
            res.push({
              id: k,
              type: g.type,
              semantics: 'connector_from'
            })
          } else if (g.points[g.points.length-1].distanceTo(position)<=10) {
            res.push({
              id: k,
              type: g.type,
              semantics: 'connector_to'
            })
          } else {
            for (let i=0;i+1<g.points.length;++i) {
              const line = new Line(g.points[i], g.points[i+1])
              if (line.distanceTo(position)<=10) {
                res.push({
                  id: k,
                  type: g.type,
                  semantics: 'wire'
                })
              }
            }
          }
        }
      }
    })

    return res
  }

  _clickPoint(e) {
    const parentOffset = $(this._element).offset();
    const x = e.pageX - parentOffset.left;
    const y = e.pageY - parentOffset.top;

    return new Point(x, y)
  }
}

WorkArea.propTypes = {
};

WorkArea.defaultProps = {
};

WorkArea.contextTypes = {
  dispatcher: React.PropTypes.object.isRequired
};
