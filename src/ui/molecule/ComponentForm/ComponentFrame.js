import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'
import PathFinding from 'pathfinding'

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
import {ConnectionVisualization} from './ConnectionVisualization'

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
  _targets = []

  render() {
    const geometry = this._prepareGeometry()

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
          reportDropTarget={(uuid, on)=>this._reportDropTarget(uuid, on)}
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
          reportDropTarget={(uuid, on)=>this._reportDropTarget(uuid, on)}
          clientToPoint={(x, y)=>this._clientToPoint(x, y)}
        />
      })}

      {this.props.componentImplementation.refsConnectionsLayer.map(layer=>{
        return layer.refsConnection.map(connection=>{
          return <ConnectionVisualization
            key={connection.businessObject.uuid}
            geometry={geometry.items[connection.businessObject.uuid]}
            connection={connection}
            componentImplementation={this.props.componentImplementation}
            registerDrag={onMove=>this._registerDrag(onMove)}
            reportDropTarget={(uuid, on)=>this._reportDropTarget(uuid, on)}
            clientToPoint={(x, y)=>this._clientToPoint(x, y)}
          />
        })
      })}

      ConnectionVisualization

      {/*this._renderGrid(geometry)*/}
    </svg>
  }

  _renderGrid(geometry) {
    let res = []

    for (let x=0;x<geometry.grid.width;++x) {
      for (let y=0;y<geometry.grid.height;++y) {
        res.push(<rect
          key={res.length}
          x={x*2}
          y={y*2}
          width={2}
          height={2}
          fill={geometry.grid.isWalkableAt(x, y)?'white':'red'}
          />)
      }
    }

    return res
  }

  _prepareGeometry() {
    const _width = 800
    const _height = 500
    const _padding = 30
    const gridStep = 5

    const geometry = {
      area: new Size(_width, _height),
      boundary: new Rectangle(_padding, _padding, _width-2*_padding, _height-2*_padding),
      items: {}
    }

    this._prepareInterfaceUsagesGeometry(geometry)
    this._prepareComponentUsagesGeometry(geometry)

    const gridWidth = Math.ceil(_width/gridStep)
    const gridHeight = Math.ceil(_height/gridStep)

    const grid = new PathFinding.Grid(gridWidth, gridHeight)

    const setPixel = (x, y)=>{
        const rx = Math.round(x/gridStep)
        const ry = Math.round(y/gridStep)

        if (rx>=0 && ry>=0) {
          if (rx<gridWidth && ry<gridHeight) {
            grid.setWalkableAt(rx, ry, false)
          }
        }
    }

    for (let x=0;x<geometry.area.width;++x) {
      for (let y=0;y<geometry.area.height;++y) {
        if (!geometry.boundary.contains(new Point(x, y))) {
          setPixel(x, y)
        }
      }
    }

    this._fillRectangles(geometry.items, setPixel)

    geometry.grid = grid

    this._prepareConnectionsGeometry(geometry, gridStep)

    return geometry
  }

  _prepareConnectionsGeometry(geometry, gridStep) {
    const convertPosition = (p)=>Math.round(p/gridStep)

    this.props.componentImplementation.refsConnectionsLayer.forEach(layer=>{
      layer.refsConnection.forEach(connection=>{
        const from = this._lookup(geometry, connection.refFrom.businessObject.uuid).headOuterPoint
        const to = this._lookup(geometry, connection.refTo.businessObject.uuid).headOuterPoint

        const finder = new PathFinding.AStarFinder({
          weight: 50
        })

        const gridBackup = geometry.grid.clone()

        var path = finder.findPath(
          convertPosition(from.x),
          convertPosition(from.y),
          convertPosition(to.x),
          convertPosition(to.y),
          gridBackup)

        let pathPoints = [].concat(
          from,
          path.map(p=>new Point(p[0]*gridStep, p[1]*gridStep)),
          to
        )

        geometry.items[connection.businessObject.uuid] = {
          pathPoints
        }
      })
    })
  }

  _lookup(geometry, uuid) {
    let res = undefined

    if (geometry.items) {
      if (geometry.items[uuid])  {
        res = geometry.items[uuid]
      } else {
        Object.values(geometry.items).forEach(item=>{
          res = res || this._lookup(item, uuid)
        })
      }
    }

    return res
  }

  _fillRectangles(items, setPixel) {
    Object.values(items).forEach(o=>this._fillRectangle(o, setPixel))
  }

  _fillRectangle(item, setPixel) {
    if (item.boundary) {
      for (let x=0;x<item.boundary.width;++x) {
        for (let y=0;y<item.boundary.height;++y) {
          setPixel(item.boundary.x+x, item.boundary.y+y)
        }
      }
    }

    if (item.items) {
      this._fillRectangles(item.items, setPixel)
    }
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
    const headOuterPoint = basePoint.added(insideDirection.multiplied(stickLength+2.5*radius))
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

    const boundCorner1 = basePoint.added(insideDirection.perpendAntiClockwise().multiplied(radius))
    const boundCorner2 = headPoint
      .added(insideDirection.multiplied(radius))
      .added(insideDirection.perpendClockwise().multiplied(radius))

    geometry.items[interfaceUsage.businessObject.uuid] = {
      basePoint,
      headPoint,
      headTouchPoint,
      headOuterPoint,
      labelPosition,
      labelRotation,
      radius,
      boundary: new Rectangle(
        Math.min(boundCorner1.x, boundCorner2.x),
        Math.min(boundCorner1.y, boundCorner2.y),
        Math.max(1, Math.abs(boundCorner1.x-boundCorner2.x)),
        Math.max(1, Math.abs(boundCorner1.y-boundCorner2.y)))
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

  _clientToPoint(x, y) {
    return new Point(
      x-this.refs.svg.getBoundingClientRect().left,
      y-this.refs.svg.getBoundingClientRect().top
    )
  }

  _frameClick(e) {
    e.stopPropagation()

    const point = this._clientToPoint(e.clientX, e.clientY)

    const geometry = this._prepareGeometry()

    const position = geometry.boundary.findNearestPosition(point)

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
      const point = this._clientToPoint(e.clientX, e.clientY)

      this._drags.forEach(onMove=>onMove(point, this._targets, false))
    }
  }

  _touchMove(e) {
    if (!Tools.isTouchDevice()) {
      return
    }

    if (this._inDragAndDrop) {
      const point = this._clientToPoint(e.touches[0].clientX, e.touches[0].clientY)

      this._drags.forEach(onMove=>onMove(point, this._targets, false))

      e.preventDefault()
    }
  }

  _mouseUp(e) {
    if (Tools.isTouchDevice()) {
      return
    }

    if (this._inDragAndDrop) {
      const point = this._clientToPoint(e.clientX, e.clientY)

      this._drags.forEach(onMove=>onMove(point, this._targets, true))
    }

    this._inDragAndDrop = false
    this._drags = []
  }

  _touchEnd(e) {
    if (!Tools.isTouchDevice()) {
      return
    }

    if (this._inDragAndDrop) {
      const point = this._clientToPoint(e.touches[0].clientX, e.touches[0].clientY)

      this._drags.forEach(onMove=>onMove(point, this._targets, true))
    }

    this._inDragAndDrop = false
    this._drags = []
  }

  _registerDrag(onMove) {
    this._drags = this._drags || []
    this._drags.push(onMove)
  }

  _reportDropTarget(uuid, on) {
    if (on) {
      if (!this._targets.includes(uuid)) {
        this._targets.push(uuid)
      }
    } else {
      this._targets = this._targets.filter(act=>act!==uuid)
    }
  }

  _onClick(e) {

    if (new Date()-this._dragStartTime>200) {
      return
    }

    const point = this._clientToPoint(e.clientX, e.clientY)

    this.context.uiState.openModal(Modals.SELECT_OBJECT_MODAL, {types: [ComponentDefinition]}, e=>{
      if (e.confirmed) {
        const componentDef = this.context.space.get(e.uuid).owner

        this.props.componentImplementation.addComponent(componentDef, point.x, point.y)
      }
    })
  }
}
