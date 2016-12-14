import Validate from '~/src/util/validate'
import ComponentDefinition from '~/src/tickator/definition/component_definition'
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import InputDefinition from '~/src/tickator/definition/input_definition'
import OutputDefinition from '~/src/tickator/definition/output_definition'
import Rectangle from '~/src/util/geometry/rectangle'
import Point from '~/src/util/geometry/point'
import Vector from '~/src/util/geometry/vector'
import ShortestPathFinder from './shortest_wire_finder'

export default class InstancesGeometry {
  constructor() {
    this._data = {}
    this._shortestPathFinder = new ShortestPathFinder()

    this._border = 40
  }

  update(componentDef, width, height) {
    Validate.isA(componentDef, ComponentDefinition)

    this._data = {
      instances: {},
      connections: {},
      self: {}
    }

    this._computeSelf(componentDef, width, height)

    componentDef.instances().forEach(instanceDef=>this._computeInstance(instanceDef))

    this._shortestPathFinder.update(width, height,
      Object.keys(this._data.instances).map(k=>this._data.instances[k]))

    componentDef.connections().forEach(connectionDef=>this._computeConnection(connectionDef))

    this._data.instances['karel'] = this._shortestPathFinder._bitArray
  }

  getForInstance(name) {
    Validate.isSet(this._data.instances, name)

    return this._data.instances[name]
  }

  getSelf() {
    return this._data.self
  }

  getForConnection(uuid) {
    Validate.isSet(this._data.connections, uuid)

    return this._data.connections[uuid]
  }

  _computeConnection(connectionDef) {
    const fromInst = this._data.instances[connectionDef.fromInstance()]
    const toInst = this._data.instances[connectionDef.toInstance()]

    let from = null
    let to = null

    if (fromInst) {
      from = fromInst.outputs[connectionDef.fromOutput()]
    } else {
      from = this._data.self.inputs[connectionDef.fromOutput()]
    }

    if (toInst) {
      to = toInst.inputs[connectionDef.toInput()]
    } else {
      to = this._data.self.outputs[connectionDef.toInput()]
    }

    this._data.connections[connectionDef.uuid()] = [
      to.headConnectionPoin,
      ...this._shortestPathFinder.find(from.wireEndPoint, to.wireEndPoint),
      from.headConnectionPoin
    ]
  }

  _computeSelf(componentDef, width, height) {
    const bbox = new Rectangle(this._border, this._border, width-2*this._border, height-2*this._border)
    const inputs = componentDef.inputs().reduce((res, i)=>{
      res[i.name()] = this._computePin(bbox, i.side(), i.ratio(), true)
      return res
    }, {})
    const outputs = componentDef.outputs().reduce((res, o)=>{
      res[o.name()] = this._computePin(bbox, o.side(), o.ratio(), true)
      return res
    }, {})

    this._data.self = {
      bbox,
      inputs,
      outputs
    }
  }

  _computeInstance(instanceDef) {
    Validate.isA(instanceDef, InstanceDefinition)

    Validate.notSet(this._data.instances, instanceDef.name())

    const boxWidth = 90
    const boxHeight = 140

    const bbox = new Rectangle(instanceDef.x()-boxWidth/2+this._border, instanceDef.y()-140/2+this._border, boxWidth, boxHeight)
    const inputs = instanceDef.definition().inputs().reduce((res, i)=>{
      res[i.name()] = this._computePin(bbox, instanceDef.inputSide(i.name()), instanceDef.inputRatio(i.name()), false)
      return res
    }, {})
    const outputs = instanceDef.definition().outputs().reduce((res, o)=>{
      res[o.name()] = this._computePin(bbox, instanceDef.outputSide(o.name()), instanceDef.outputRatio(o.name()), false)
      return res
    }, {})

    this._data.instances[instanceDef.name()] = {
      bbox,
      inputs,
      outputs
    }
  }

  _computePin(bbox, side, ratio, isForRoot) {
    const headRadius = 5

    const instanceMountPosition = this._computeMountPosition(bbox, side, ratio)
    let headDirection = this._computeHeadDirection(side)

    if (isForRoot) {
      headDirection = headDirection.multiplied(-1)
    }

    const headMountPosition = instanceMountPosition.added(headDirection.multiplied(15))
    const headCenter = headMountPosition.added(headDirection.multiplied(headRadius))
    const headConnectionPoin = headCenter.added(headDirection.multiplied(headRadius))
    const wireEndPoint = headCenter.added(headDirection.multiplied(headRadius+10))

    return {
      headRadius,
      instanceMountPosition,
      headMountPosition,
      headCenter,
      headConnectionPoin,
      wireEndPoint,
      textAlignHorizontal: this._calculateTextAlignHorizontal(side, isForRoot),
      textAlignVertical: this._calculateTextAlignVertical(side, isForRoot),
      textPosition: instanceMountPosition.added(this._calculateTextPosition(side, isForRoot))
    }
  }

  _calculateTextAlignHorizontal(side, isForRoot) {
    switch (side) {
      case "top":
        return "middle"
      case "left":
        return isForRoot ? "end" : "start"
      case "bottom":
        return "middle"
      case "right":
        return isForRoot ? "start" : "end"
      default:
        throw "Unknown side "+side
        break
    }
  }

  _calculateTextAlignVertical(side, isForRoot) {
    switch (side) {
      case "top":
        return isForRoot ? "baseline" : "text-before-edge"
      case "left":
        return "middle"
      case "bottom":
        return isForRoot ? "text-before-edge" : "baseline"
      case "right":
        return "middle"
      default:
        throw "Unknown side "+side
        break
    }
  }

  _calculateTextPosition(side, isForRoot) {
    const labelOffset = (isForRoot?-1:1)*4

    let textX = 0
    let textY = 0

    switch (side) {
      case "top":
          textX = 0
          textY = labelOffset
        break
      case "left":
          textX = labelOffset
          textY = 0
        break
      case "bottom":
          textX = 0
          textY = -labelOffset
        break
      case "right":
          textX = -labelOffset
          textY = 0
        break
      default:
        throw "Unknown side "+side
        break
    }

    return new Vector(textX, textY)
  }

  _computeMountPosition(bbox, side, ratio) {
    let x = 0
    let y = 0

    const ratioNorm = Math.min(1.0, Math.max(0.0, ratio))

    switch (side) {
      case "top":
          x = bbox.x+ratioNorm*bbox.width
          y = bbox.y
        break
      case "left":
          x = bbox.x
          y = bbox.y+ratioNorm*bbox.height
        break
      case "bottom":
          x = bbox.x+ratioNorm*bbox.width
          y = bbox.y+bbox.height
        break
      case "right":
          x = bbox.x+bbox.width
          y = bbox.y+ratioNorm*bbox.height
        break
      default:
          throw "Unknown side "+side
        break
    }

    return new Point(Math.round(x), Math.round(y))
  }

  _computeHeadDirection(side) {
    switch (side) {
      case "top":
        return new Vector(0, -1)
      case "left":
        return new Vector(-1, 0)
      case "bottom":
        return new Vector(0, 1)
      case "right":
        return new Vector(1, 0)
      default:
        throw "Unknown side "+side
    }
  }
}