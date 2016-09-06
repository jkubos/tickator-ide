import React from 'react';

import {Component} from "./component"
import Wire from "./wire"

import BitArrayVisualization from "./bit_array_visualization"
import GeometryCalculator from "../geom/geometry_calculator"
import Point from "../geom/point"

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
        onMouseDown={e=>this.onMouseDown(e)}
        onMouseUp={e=>this.onMouseUp(e)} >

        {wires}
        {components}
        {/*<BitArrayVisualization array={this._geomCalculator._bitArray}/>*/}

      </svg>
    </div>
  }

  onMouseDown(e) {
    const point = this._clickPoint(e)
    const shape = this._findShape(point)

    if (shape && shape.type=="component") {
      this.context.dispatcher.dispatch({
        command: "component.move.begin",
        id: shape.id,
        position: point
      });
    }
  }

  onMouseUp(e) {
    const point = this._clickPoint(e)
    // const shape = this._findShape(point)

    // if (shape && shape.type=="component") {
      this.context.dispatcher.dispatch({
        command: "component.move.end",
        // id: shape.id,
        position: point
      });
    // }
  }

  _findShape(position) {
    const found = Object.keys(this._geometry).filter(k=>{
      if (this._geometry[k].type=="component") {
        return this._geometry[k].bbox.contains(position)
      }

      return false
    })

    return found.length>0 ? this._geometry[found[0]] : null
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
