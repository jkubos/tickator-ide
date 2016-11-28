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
  }

  update(componentDef, width, height) {
    Validate.isA(componentDef, ComponentDefinition)

    this._data = {
      instances: {},
      connections: {}
    }

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
      from = {headConnectionPoin: new Point(20, 20)}
    }

    if (toInst) {
      to = toInst.inputs[connectionDef.toInput()]
    } else {
      to = {headConnectionPoin: new Point(20, 20)}
    }

    this._data.connections[connectionDef.uuid()] = this._shortestPathFinder.find(from.headConnectionPoin,
      to.headConnectionPoin)
  }

  _computeInstance(instanceDef) {
    Validate.isA(instanceDef, InstanceDefinition)

    Validate.notSet(this._data.instances, instanceDef.name())

    const boxWidth = 90
    const boxHeight = 140

    const bbox = new Rectangle(instanceDef.x()-boxWidth/2, instanceDef.y()-140/2, boxWidth, boxHeight)
    const inputs = instanceDef.definition().inputs().reduce((res, i)=>{
      res[i.name()] = this._computePin(bbox, i)
      return res
    }, {})
    const outputs = instanceDef.definition().outputs().reduce((res, o)=>{
      res[o.name()] = this._computePin(bbox, o)
      return res
    }, {})

    this._data.instances[instanceDef.name()] = {
      bbox,
      inputs,
      outputs
    }
  }

  _computePin(bbox, pinDef) {
    Validate.isAnyOfA(pinDef, [InputDefinition, OutputDefinition])

    const headRadius = 5

    const instanceMountPosition = this._computeMountPosition(bbox, pinDef)
    const headDirection = this._computeHeadDirection(pinDef)

    const headMountPosition = instanceMountPosition.added(headDirection.multiplied(15))
    const headCenter = headMountPosition.added(headDirection.multiplied(headRadius))
    const headConnectionPoin = headCenter.added(headDirection.multiplied(headRadius))

    return {
      headRadius,
      instanceMountPosition,
      headMountPosition,
      headCenter,
      headConnectionPoin,
      textAlignHorizontal: this._calculateTextAlignHorizontal(pinDef),
      textAlignVertical: this._calculateTextAlignVertical(pinDef),
      textPosition: instanceMountPosition.added(this._calculateTextPosition(pinDef))
    }
  }

  _calculateTextAlignHorizontal(pinDef) {
    switch (pinDef.side()) {
      case "top":
        return "middle"
      case "left":
        return "start"
      case "bottom":
        return "middle"
      case "right":
        return "end"
      default:
        throw "Unknown side "+pinDef.side()
        break
    }
  }

  _calculateTextAlignVertical(pinDef) {
    switch (pinDef.side()) {
      case "top":
        return "text-before-edge"
      case "left":
        return "middle"
      case "bottom":
        return "baseline"
      case "right":
        return "middle"
      default:
        throw "Unknown side "+pinDef.side()
        break
    }
  }

  _calculateTextPosition(pinDef) {
    const labelOffset = 4

    let textX = 0
    let textY = 0

    switch (pinDef.side()) {
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
        throw "Unknown side "+pinDef.side()
        break
    }

    return new Vector(textX, textY)
  }

  _computeMountPosition(bbox, pinDef) {
    let x = 0
    let y = 0

    const ratio = Math.min(1.0, Math.max(0.0, pinDef.ratio()))

    switch (pinDef.side()) {
      case "top":
          x = bbox.x+ratio*bbox.width
          y = bbox.y
        break
      case "left":
          x = bbox.x
          y = bbox.y+ratio*bbox.height
        break
      case "bottom":
          x = bbox.x+ratio*bbox.width
          y = bbox.y+bbox.height
        break
      case "right":
          x = bbox.x+bbox.width
          y = bbox.y+ratio*bbox.height
        break
      default:
          throw "Unknown side "+pinDef.side()
        break
    }

    return new Point(Math.round(x), Math.round(y))
  }

  _computeHeadDirection(pinDef) {
    switch (pinDef.side()) {
      case "top":
        return new Vector(0, -1)
      case "left":
        return new Vector(-1, 0)
      case "bottom":
        return new Vector(0, 1)
      case "right":
        return new Vector(1, 0)
      default:
        throw "Unknown side "+pinDef.side()
    }
  }
}
