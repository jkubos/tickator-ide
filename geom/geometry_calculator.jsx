import Rectangle from "./rectangle"
import Point from "./point"
import Vector from "./vector"
import Size from "./size"
import BinaryArray2D from "../utils/binary_array_2d"

export default class GeometryCalculator {
  constructor() {
    this._cellSize = 10.0
    this._componentWidth = 80
    this._componentHeight = 160
    this._pinRadius = 5
    this._pinLength = 20
  }

  recalculate(areaSize, data) {
    const geometry = {};

    (data.components || []).forEach(comp=>{

      geometry[comp.id] = this._prepareComponentGeometry(comp);

      (comp.pins || []).forEach(pin=>{
        geometry[pin.id] = this._preparePinGeometry(geometry[comp.id], pin, comp)
      })
    })

    this._prepareBitArray(areaSize)
    this._fillBitArray(geometry)

    data.wires.map(wire=>{
      geometry[wire.id] = this._prepareWireGeometry(geometry, wire)
    })

    return geometry
  }

  _prepareComponentGeometry(comp) {
    return {
      type: "component",
      id: comp.id,
      bbox: new Rectangle(
        comp.positionX,
        comp.positionY,
        this._componentWidth,
        this._componentHeight)
    }
  }

  _preparePinGeometry(compGeometry, pin, comp) {
    const mount = this._calculatePinMountPosition(compGeometry, pin)
    const dir = this._calculatePinDirection(pin)
    const [textDir, textAlignVertical, textAlignHorizontal] = this._calculatePinLabelPosition(pin)

    const head = mount.added(dir.multiplied(this._pinLength))
    const headTouch = mount.added(dir.multiplied(this._pinLength-this._pinRadius))
    const text = mount.added(textDir)

    return {
      type: "pin",
      id: pin.id,
      componentId: comp.id,
      mount: mount,
      radius: this._pinRadius,
      head: head,
      headTouch: headTouch,
      text: text,
      textAlignVertical: textAlignVertical,
      textAlignHorizontal: textAlignHorizontal
    }
  }

  _prepareWireGeometry(geometry, wire) {
    const points = []

    const fromPin = geometry[wire.from];
    const toPin = geometry[wire.to];

    this._bitArray.snapshot()
    let cellPath = this._dijkstra(fromPin, toPin);
    this._bitArray.restore()

    while (cellPath) {
      points.push([cellPath.x, cellPath.y])
      cellPath = cellPath.prev
    }

    for (let i=0;i<points.length;++i) {
      if (i==0) {
        points[i] = toPin.head
      } else if (i+1==points.length) {
        points[i] = fromPin.head
      } else {
        points[i] = new Point(points[i][0]*this._cellSize, points[i][1]*this._cellSize)
      }
    }

    return {
      type: "wire",
      id: wire.id,
      points: points
    }
  }

  _calculatePinLabelPosition(pin) {
    const labelOffset = 2

    let textX = 0
    let textY = 0
    let textAlignVertical = "middle"
    let textAlignHorizontal = "middle"

    switch (pin.side) {
      case "top":
          textX = 0
          textY = labelOffset
          textAlignVertical = "text-before-edge"
          textAlignHorizontal = "middle"
        break
      case "left":
          textX = labelOffset
          textY = 0
          textAlignVertical = "middle"
          textAlignHorizontal = "start"
        break
      case "bottom":
          textX = 0
          textY = -labelOffset
          textAlignVertical = "baseline"
          textAlignHorizontal = "middle"
        break
      case "right":
          textX = -labelOffset
          textY = 0
          textAlignVertical = "middle"
          textAlignHorizontal = "end"
        break
      default:
        throw "Unknown side "+pin.side
        break
    }

    return [new Vector(textX, textY), textAlignVertical, textAlignHorizontal]
  }

  _calculatePinMountPosition(compGeometry, pin) {
    let x = 0
    let y = 0

    const ratio = Math.min(100, Math.max(0, pin.offsetPerc))/100.0

    switch (pin.side) {
      case "top":
          x = compGeometry.bbox.x+ratio*compGeometry.bbox.width
          y = compGeometry.bbox.y
        break
      case "left":
          x = compGeometry.bbox.x
          y = compGeometry.bbox.y+ratio*compGeometry.bbox.height
        break
      case "bottom":
          x = compGeometry.bbox.x+ratio*compGeometry.bbox.width
          y = compGeometry.bbox.y+compGeometry.bbox.height
        break
      case "right":
          x = compGeometry.bbox.x+compGeometry.bbox.width
          y = compGeometry.bbox.y+ratio*compGeometry.bbox.height
        break
      default:
        throw "Unknown side "+pin.side
        break
    }

    return new Point(Math.round(x), Math.round(y))
  }

  _calculatePinDirection(pin) {
    switch (pin.side) {
      case "top":
        return new Vector(0, -1)
      case "left":
        return new Vector(-1, 0)
      case "bottom":
        return new Vector(0, 1)
      case "right":
        return new Vector(1, 0)
      default:
        throw "Unknown side "+pin.side
    }
  }

  _prepareBitArray(areaSize) {
    const cellsWidth = Math.ceil(areaSize.width/this._cellSize)
    const cellsHeight = Math.ceil(areaSize.height/this._cellSize)

    const currentSize = new Size(cellsWidth, cellsHeight)

    if (!this._bitArray || !this._lastSize.equals(currentSize)) {
      this._lastSize = currentSize

      this._bitArray = new BinaryArray2D(this._lastSize)
    } else {
      this._bitArray.reset()
    }
  }

  _fillBitArray(geometry) {
    Object.keys(geometry).forEach(k=>{
      const geom = geometry[k]

      if (geom.type=='component') {
        this._fillComponent(geom)
      } else if (geom.type=='pin') {
        this._fillPin(geom)
      }
    })
  }

  _fillComponent(geom) {
    const minX = Math.floor(geom.bbox.x/this._cellSize)
    const maxX = Math.ceil((geom.bbox.x+geom.bbox.width)/this._cellSize)

    const minY = Math.floor(geom.bbox.y/this._cellSize)
    const maxY = Math.ceil((geom.bbox.y+geom.bbox.height)/this._cellSize)

    for (let x=minX;x<=maxX;++x) {
      for (let y=minY;y<=maxY;++y) {
        this._bitArray.set(new Point(x, y))
      }
    }
  }

  _fillPin(geom) {
    const px = Math.round(geom.head.x/this._cellSize)
    const py = Math.round(geom.head.y/this._cellSize)

    for (let x=px-2;x<=px+2;++x) {
      for (let y=py-2;y<=py+2;++y) {
        this._bitArray.set(new Point(x, y))
      }
    }
  }

  _manhattanDistance(x1, y1, x2, y2) {
      return (Math.abs(x2-x1) + Math.abs(y2-y1));
  }

  _minBendEstimate(start, end, dir) {
      var same_line = false,
          in_front = false;
      if((dir == 0 || dir == 2) && (start.y == end.y)) {
          same_line = true;
      }
      if((dir == 1 || dir == 3) && (start.x == end.x)) {
          same_line = true;
      }

      if(dir == 0 && (start.y-end.y > 0)) {
          in_front = true;
      }

      if(dir == 2 && (end.y-start.y > 0)) {
          in_front = true;
      }

      if(dir == 1 && (start.x-end.x > 0)) {
          in_front = true;
      }

      if(dir == 3 && (end.x-start.x > 0)) {
          in_front = true;
      }

      if(same_line) {
          if(in_front) {
              return 0;
          }
          else {
              return 3;
          }
      }
      else if(in_front) {
          return 1;
      }
      else {
          return 2;
      }
  }

  _dijkstra(fromPin, toPin) {
    const queue = [];
    const visitedNear = [];

    const sx = Math.round(fromPin.head.x/this._cellSize);
    const sy = Math.round(fromPin.head.y/this._cellSize);

    const tx = Math.round(toPin.head.x/this._cellSize);
    const ty = Math.round(toPin.head.y/this._cellSize);

    const start_coord = {x: sx, y: sy};
    start_coord.cost = 0;
    start_coord.heuristic = this._manhattanDistance(sx, sy, tx, ty);
    start_coord.bends = 0;
    start_coord.distance = 0;
    queue.push(start_coord);

    let best = null;

    while (queue.length>0) {
      var coord = queue.pop();
      //console.log("Visiting %o and %s, %s", coord, tx, ty);

      if (best==null
        || this._manhattanDistance(coord.x, coord.y, tx, ty)
        <this._manhattanDistance(best.x, best.y, tx, ty)) {
        best = coord;
      }

      if(coord.x==tx && coord.y==ty) {
          return coord;
      }

      const neighbors = [];

      if (coord.y-1>=0) {
        neighbors[0] = {x: coord.x, y: coord.y-1};
      }

      if (coord.x-1>=0) {
        neighbors[1] = {x: coord.x-1, y: coord.y};
      }

      if (coord.y+1<this._bitArray.getHeight()) {
        neighbors[2] = {x: coord.x, y: coord.y+1};
      }

      if (coord.x+1<this._bitArray.getWidth()) {
        neighbors[3] = {x: coord.x+1, y: coord.y};
      }

      neighbors.forEach((n, i) => {
          const isNearTarget = (Math.abs(n.x-sx)<=2 && Math.abs(n.y-sy)<=2)
          || (Math.abs(n.x-tx)<=2 && Math.abs(n.y-ty)<=2);

          if(!this._bitArray.get(new Point(n.x, n.y))
          || (isNearTarget && !visitedNear.includes(n.x+"_"+n.y))) {
            for(var j = 0;j < queue.length;j++) {
                var qitem = queue[j];
                if(qitem.x==n.x && qitem.y==n.y) {
                    n = qitem;
                    break;
                }
            }

            if(j == queue.length) {
              queue.push(n);
            }

            var distance = coord.distance+1;
            var bends = coord.bends;
            if(coord.prev) {
                if(coord.prev.x != n.x && coord.prev.y != n.y) {
                    bends = coord.bends+1;
                }
            }
            var cost = (distance+bends);
            var remBends = this._minBendEstimate(n, {x: tx, y: ty}, i);
            if(typeof n.cost == 'undefined' || (cost+remBends) < (n.cost+n.remBends)) {
                n.cost = cost;
                n.distance = distance;
                n.bends = bends;
                n.prev = coord;
                n.remBends = remBends
                n.heuristic = this._manhattanDistance(n.x, n.y, tx, ty)+remBends;
                n.dir = i;
            }
          }
      })

      queue.sort(function(a, b) {
          return (b.cost+b.heuristic)-(a.cost+a.heuristic);
      });

      const isNearTarget = (Math.abs(coord.x-sx)<=2 && Math.abs(coord.y-sy)<=2)
      || (Math.abs(coord.x-tx)<=2 && Math.abs(coord.y-ty)<=2);

      if (isNearTarget) {
        visitedNear.push(coord.x+"_"+coord.y);
      }

      this._bitArray.set(new Point(coord.x, coord.y))
    }

    return best;
  }
}
