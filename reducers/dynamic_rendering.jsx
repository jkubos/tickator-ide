import {lookupInScene} from "../utils/store_helpers"
import Line from "../geom/line"
import Point from "../geom/point"

export default function dynamicRenderingReducer(state, action) {
  switch (action.type) {
    case 'mouse.down':
      action.selectedObjects.forEach(o=>{
        if (o.type=='pin' && o.semantics=='head') {
          state.dynamic.cursor = 'crosshair'
        } if (o.type=='pin' && o.semantics=='stick') {
          const pin = lookupInScene(state.scene, o.id)
          state.dynamic.cursor = pin.side=='left' || pin.side=='right' ? 'row-resize' : 'col-resize'
          state.dynamic.movedObject = {
            id: o.id,
            type: 'pin',
            componentBbox: o.componentBbox,
            originalPosition: {
               side: pin.side,
               offsetPerc: pin.offsetPerc
            }
          }
        } else if (o.type=='component' && o.semantics=='body') {
          const comp = lookupInScene(state.scene, o.id)

          state.dynamic.cursor = 'move'
          state.dynamic.movedObject = {
            id: o.id,
            type: 'component',
            originalPosition: {
              positionX : comp.positionX,
              positionY : comp.positionY
            }
          }
        }
      })
      break;
    case 'mouse.move':
      if (state.dynamic.movedObject) {
        const o = lookupInScene(state.scene, state.dynamic.movedObject.id)

        if (state.dynamic.movedObject.type=='component') {
          o.positionX = action.position.x
          o.positionY = action.position.y
        } else if (state.dynamic.movedObject.type=='pin'){
          movePinPosition(state.dynamic.movedObject.componentBbox, o, action.position)
        } else {
          throw `Uknown moved object ${state.dynamic.movedObject.type}`
        }
      }

      break;
    case 'mouse.up':
      state.dynamic.cursor = 'default'
      state.dynamic.movedObject = undefined

      break;
  }

  return state
}

function movePinPosition(componentBbox, obj, position) {
  const sides = [
    {
      side: 'left',
      line: new Line(new Point(componentBbox.x, componentBbox.y),
        new Point(componentBbox.x, componentBbox.y+componentBbox.height)),
      vertical: true
    },
    {
      side: 'right',
      line: new Line(new Point(componentBbox.x+componentBbox.width, componentBbox.y),
        new Point(componentBbox.x+componentBbox.width, componentBbox.y+componentBbox.height)),
      vertical: true
    },
    {
      side: 'top',
      line: new Line(new Point(componentBbox.x, componentBbox.y),
        new Point(componentBbox.x+componentBbox.width, componentBbox.y)),
      vertical: false
    },
    {
      side: 'bottom',
      line: new Line(new Point(componentBbox.x, componentBbox.y+componentBbox.height),
        new Point(componentBbox.x+componentBbox.width, componentBbox.y+componentBbox.height)),
      vertical: false
    }
  ]

  let minDist = Number.MAX_SAFE_INTEGER

  sides.forEach(side=>{
    let dist = side.line.distanceTo(position)

    if (dist<minDist) {
      minDist = dist

      obj.side = side.side

      let offs = 0

      if (side.vertical) {
        offs = position.y-componentBbox.y
      } else {
        offs = position.x-componentBbox.x
      }

      obj.offsetPerc = Math.max(0, Math.min(100, (offs/side.line.length())*100))
    }
  })
}
