import Validate from '../util/validate'
import ComponentDefinition from '../tickator/component_definition'
import InstanceDefinition from '../tickator/instance_definition'
import InputDefinition from '../tickator/input_definition'
import OutputDefinition from '../tickator/output_definition'
import Rectangle from './rectangle'
import Point from './point'
import Vector from './vector'
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
    const from = this._data.instances[connectionDef.fromInstance()].outputs[connectionDef.fromOutput()]
    const to = this._data.instances[connectionDef.toInstance()].inputs[connectionDef.toInput()]

    this._data.connections[connectionDef.uuid()] = this._shortestPathFinder.find(from.headConnectionPoin,
      to.headConnectionPoin)
  }

  _computeInstance(instanceDef) {
    Validate.isA(instanceDef, InstanceDefinition)

    Validate.notSet(this._data.instances, instanceDef.name())

    const bbox = new Rectangle(instanceDef.x()-50, instanceDef.y()-75, 100, 150)
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
