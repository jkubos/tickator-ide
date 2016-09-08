export default class Dispatcher {
  constructor() {
    this._data = {}
    this._initialize()
    this._onChangeCallbacks = []
  }

  data() {
    return this._data
  }

  dispatch(command) {
    console.log(command);

    let changed = false;

    if (command.command=="mouse.down") {
      command.selectedObjects.forEach(o=>{
        if (o.type=='component' && o.semantics=='body') {
          this._context = o.id
        }
      })
    } else if (command.command=="mouse.move") {
      if (this._context) {
        this._data.xxx.components.filter(c=>c.id==this._context).forEach(c=>{
          c.positionX = command.position.x
          c.positionY = command.position.y
          changed = true;
        })
      }
    } else if (command.command=="mouse.up") {
      if (this._context) {
        this._data.xxx.components.filter(c=>c.id==this._context).forEach(c=>{
          c.positionX = command.position.x
          c.positionY = command.position.y
          changed = true;
        })

        this._context = null
      }
    }

    if (changed) {
      this._onChangeCallbacks.forEach(c=>c())
    }
  }

  onChange(callback) {
    this._onChangeCallbacks.push(callback)
  }

  _initialize() {
    this._data.xxx = {
      components: [
        {
          id: "c",
          label: "compare",
          positionX: 100,
          positionY: 300,
          pins: [
            {
              id: "c0",
              name: "c0",
              side: "right",
              offsetPerc: 20,
              type: "in"
            },
            {
              id: "c1",
              name: "c1",
              side: "right",
              offsetPerc: 80,
              type: "in"
            },
            {
              id: "c2",
              name: "c2",
              side: "left",
              offsetPerc: 50,
              type: "out"
            }
          ]
        },
        {
          id: "b",
          label: "print",
          positionX: 400,
          positionY: 200,
          pins: [
            {
              id: "b0",
              name: "b0",
              side: "top",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "b1",
              name: "b1",
              side: "bottom",
              offsetPerc: 50,
              type: "in"
            }
          ]
        },
        {
          id: "a",
          label: "counter",
          positionX: 600,
          positionY: 50,
          pins: [
            {
              id: "a0",
              name: "a0",
              side: "right",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "a1",
              name: "a1",
              side: "top",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "a2",
              name: "a2",
              side: "bottom",
              offsetPerc: 50,
              type: "out"
            }
          ]
        }
      ],
      wires: [
        {
          id: "w1",
          from: "b1",
          to: "c2"
        },
        {
          id: "w2",
          from: "c0",
          to: "b0"
        },
        {
          id: "w3",
          from: "c1",
          to: "a0"
        },
        {
          id: "w4",
          from: "a1",
          to: "a2"
        }
      ]
    }
  }
}
