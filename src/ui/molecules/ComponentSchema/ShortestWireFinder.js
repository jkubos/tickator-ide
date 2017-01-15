import {BinaryArray2D} from '~/src/util/BinaryArray2d'
import {Size} from '~/src/util/geometry/Size'
import {Point} from '~/src/util/geometry/Point'

export class ShortestPathFinder {
  constructor() {
    this._cellSize = 7
  }

  update(width, height, instanceGeoms) {
    this._prepareBitArray(width, height)
    instanceGeoms.forEach(i=>this._fillInstance(i))
  }

  find(from, to) {
    const points = []

    this._bitArray.snapshot()
    let cellPath = this._dijkstra(from, to);
    this._bitArray.restore()

    while (cellPath) {
      points.push([cellPath.x, cellPath.y])
      cellPath = cellPath.prev
    }

    for (let i=0;i<points.length;++i) {
      if (i==0) {
        points[i] = to
      } else if (i+1==points.length) {
        points[i] = from
      } else {
        points[i] = new Point(points[i][0]*this._cellSize, points[i][1]*this._cellSize)
      }
    }

    return points
  }

  _prepareBitArray(width, height) {
    const cellsWidth = Math.ceil(width/this._cellSize)
    const cellsHeight = Math.ceil(height/this._cellSize)

    const currentSize = new Size(cellsWidth, cellsHeight)

    if (!this._bitArray || !this._lastSize.equals(currentSize)) {
      this._lastSize = currentSize
      this._bitArray = new BinaryArray2D(this._lastSize)
    } else {
      this._bitArray.reset()
    }
  }

  _fillInstance(instanceGeom) {
    const minX = Math.floor(instanceGeom.bbox.x/this._cellSize)
    const maxX = Math.ceil((instanceGeom.bbox.x+instanceGeom.bbox.width)/this._cellSize)

    const minY = Math.floor(instanceGeom.bbox.y/this._cellSize)
    const maxY = Math.ceil((instanceGeom.bbox.y+instanceGeom.bbox.height)/this._cellSize)

    for (let x=minX;x<=maxX;++x) {
      for (let y=minY;y<=maxY;++y) {
        this._bitArray.set(new Point(x, y))
      }
    }

    Object.keys(instanceGeom.inputs).forEach(k=>this._fillPin(instanceGeom.inputs[k]))
    Object.keys(instanceGeom.outputs).forEach(k=>this._fillPin(instanceGeom.outputs[k]))
  }

  _fillPin(pinGeom) {

    [pinGeom.headCenter, pinGeom.instanceMountPosition].forEach(point=>{
      let px = Math.round(point.x/this._cellSize)
      let py = Math.round(point.y/this._cellSize)

      for (let x=px-2;x<=px+2;++x) {
        for (let y=py-2;y<=py+2;++y) {
          this._bitArray.set(new Point(x, y))
        }
      }
    })
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

  _dijkstra(from, to) {
    const queue = [];
    const visitedNear = [];

    const sx = Math.round(from.x/this._cellSize);
    const sy = Math.round(from.y/this._cellSize);

    const tx = Math.round(to.x/this._cellSize);
    const ty = Math.round(to.y/this._cellSize);

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
