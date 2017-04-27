import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'
import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'
import {ComponentImplementation} from '~/src/tickator/definition/ComponentImplementation'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {EditableText} from '~/src/ui/atom/EditableText'

import {Rectangle} from '~/src/util/geometry/Rectangle'
import {Size} from '~/src/util/geometry/Size'
import {Point} from '~/src/util/geometry/Point'

import {InterfaceUsageVisualization} from './InterfaceUsageVisualization'
import {ComponentUsageVisualization} from './ComponentUsageVisualization'

@observer
export class ComponentFrame extends React.Component {

  static propTypes = {
    componentDefinition: React.PropTypes.instanceOf(ComponentDefinition).isRequired,
    componentImplementation: React.PropTypes.instanceOf(ComponentImplementation).isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }
  _drags = []

  render() {
    const geometry = this._prepareGeometry()

    // console.log(geometry)

    return <svg
      ref='svg'
      className={styles.componentFrame}
      width={geometry.area.width}
      height={geometry.area.height}

      onMouseDown={e=>this._mouseDown(e)}
      onMouseMove={e=>this._mouseMove(e)}
      onMouseUp={e=>this._mouseUp(e)}

      onTouchStart={e=>this._touchStart(e)}
      onTouchMove={e=>this._touchMove(e)}
      onTouchEnd={e=>this._touchEnd(e)}

      onClick={e=>this._onClick(e)}
    >

      <rect
        className={styles.outerFrame}
        x={geometry.boundary.x}
        y={geometry.boundary.y}
        width={geometry.boundary.width}
        height={geometry.boundary.height}
        onClick={e=>this._frameClick(e)}
        />

      <rect
        className={styles.frame}
        x={geometry.boundary.x}
        y={geometry.boundary.y}
        width={geometry.boundary.width}
        height={geometry.boundary.height}
        onClick={e=>this._frameClick(e)}
        />

      {this.props.componentDefinition.refsInterfaceUsage.map(interfaceUsage=>{
        return <InterfaceUsageVisualization
          key={interfaceUsage.businessObject.uuid}
          geometry={geometry.items[interfaceUsage.businessObject.uuid]}
          interfaceUsage={interfaceUsage}
          componentImplementation={this.props.componentImplementation}
          registerDrag={onMove=>this._registerDrag(onMove)}
          boundary={geometry.boundary}
        />
      })}

      {this.props.componentImplementation.refsComponentUsage.map(componentUsage=>{
        return <ComponentUsageVisualization
          key={componentUsage.businessObject.uuid}
          geometry={geometry.items[componentUsage.businessObject.uuid]}
          componentUsage={componentUsage}
          componentImplementation={this.props.componentImplementation}
          registerDrag={onMove=>this._registerDrag(onMove)}
        />
      })}
    </svg>
  }

  _prepareGeometry() {
    const _width = 800
    const _height = 500
    const _padding = 30

    const geometry = {
      area: new Size(_width, _height),
      boundary: new Rectangle(_padding, _padding, _width-2*_padding, _height-2*_padding),
      items: {}
    }

    this._prepareInterfaceUsagesGeometry(geometry)
    this._prepareComponentUsagesGeometry(geometry)

    return geometry
  }

  _prepareInterfaceUsagesGeometry(geometry) {
    this.props.componentDefinition.refsInterfaceUsage.forEach(interfaceUsage=>{
      this._prepareInterfaceUsageGeometry(geometry, interfaceUsage, true)
    })
  }

  _prepareInterfaceUsageGeometry(geometry, interfaceUsage, isFrame) {
    const insideDirection = geometry.boundary.insideDirection(interfaceUsage.side).multiplied(isFrame?1:-1)
    const radius = 8
    const stickLength = 10

    const basePoint = geometry.boundary.findPosition(interfaceUsage.side, interfaceUsage.sideRatio)
    const headPoint = basePoint.added(insideDirection.multiplied(stickLength+radius))
    const headTouchPoint = basePoint.added(insideDirection.multiplied(stickLength))

    const labelPosition = basePoint.added(insideDirection.multiplied(-15))

    let labelRotation = 0

    switch (interfaceUsage.side) {
      case 'left':
        labelRotation = -90
        break;
      case 'right':
        labelRotation = 90
        break;
      case 'top':
        labelRotation = 0
        break;
      case 'bottom':
        labelRotation = 0
        break;
    }

    geometry.items[interfaceUsage.businessObject.uuid] = {
      basePoint,
      headPoint,
      headTouchPoint,
      labelPosition,
      labelRotation,
      radius
    }
  }

  _prepareComponentUsagesGeometry(geometry) {
    this.props.componentImplementation.refsComponentUsage.forEach(componentUsage=>{
      const localGeometry = {
        boundary: new Rectangle(componentUsage.x-70, componentUsage.y-70, 140, 140),
        center: new Point(componentUsage.x, componentUsage.y),
        items: {}
      }

      geometry.items[componentUsage.businessObject.uuid] = localGeometry

      componentUsage.refComponentDefinition.refsInterfaceUsage.forEach(interfaceUsage=>{
        this._prepareInterfaceUsageGeometry(localGeometry, interfaceUsage, false)
      })
    })
  }

  _frameClick(e) {
    e.stopPropagation()

    const x = e.clientX-this.refs.svg.getBoundingClientRect().left
    const y = e.clientY-this.refs.svg.getBoundingClientRect().top

    const geometry = this._prepareGeometry()

    const position = geometry.boundary.findNearestPosition(new Point(x, y))

    this.context.uiState.openModal(Modals.SELECT_OBJECT_MODAL, {types: [InterfaceDefinition]}, e=>{
      if (e.confirmed) {
        this.props.componentDefinition.addIterface(this.context.space.get(e.uuid).owner, position.side, position.ratio)
      }
    })
  }

  _mouseDown(e) {
    if (Tools.isTouchDevice()) {
      return
    }

    this._inDragAndDrop = true
    this._dragStartTime = new Date()
  }

  _touchStart(e) {
    if (!Tools.isTouchDevice()) {
      return
    }
    this._inDragAndDrop = true
    this._dragStartTime = new Date()
  }

  _mouseMove(e) {
    if (Tools.isTouchDevice()) {
      return
    }

    if (this._inDragAndDrop) {
      const x = e.clientX-this.refs.svg.getBoundingClientRect().left
      const y = e.clientY-this.refs.svg.getBoundingClientRect().top

      const point = new Point(x, y)

      this._drags.forEach(onMove=>onMove(point))
    }
  }

  _touchMove(e) {
    if (!Tools.isTouchDevice()) {
      return
    }

    if (this._inDragAndDrop) {
      const x = e.touches[0].clientX-this.refs.svg.getBoundingClientRect().left
      const y = e.touches[0].clientY-this.refs.svg.getBoundingClientRect().top

      const point = new Point(x, y)

      this._drags.forEach(onMove=>onMove(point))

      e.preventDefault()
    }
  }

  _mouseUp(e) {
    if (Tools.isTouchDevice()) {
      return
    }

    this._inDragAndDrop = false
    this._drags = []
  }

  _touchEnd(e) {
    if (!Tools.isTouchDevice()) {
      return
    }

    this._inDragAndDrop = false
    this._drags = []
  }

  _registerDrag(onMove) {
    this._drags = this._drags || []
    this._drags.push(onMove)
  }

  _onClick(e) {

    if (new Date()-this._dragStartTime>200) {
      return
    }

    const x = e.clientX-this.refs.svg.getBoundingClientRect().left
    const y = e.clientY-this.refs.svg.getBoundingClientRect().top

    this.context.uiState.openModal(Modals.SELECT_OBJECT_MODAL, {types: [ComponentDefinition]}, e=>{
      if (e.confirmed) {
        const componentDef = this.context.space.get(e.uuid).owner

        this.props.componentImplementation.addComponent(componentDef, x, y)
      }
    })
  }
}
