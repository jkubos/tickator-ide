
export function fillDatabase(db) {
  db.clean()
  db.set('c1', {
    id: 'c1',
    type: 'component',
    label: "compare",
    pins: [
    ],
    wires: [
    ],
    subcomponents: [
    ]
  })
}

export function initData() {
  return {
    dynamic: {
      cursor: 'default'
    },
    scene: {
      components: [
        {
          id: "c",
          type: "component",
          label: "compare",
          positionX: 100,
          positionY: 300,
          pins: [
            {
              id: "c0",
              type: "pin",
              name: "c0",
              side: "right",
              offsetPerc: 20,
              type: "in"
            },
            {
              id: "c1",
              type: "pin",
              name: "c1",
              side: "right",
              offsetPerc: 80,
              type: "in"
            },
            {
              id: "c2",
              type: "pin",
              name: "c2",
              side: "left",
              offsetPerc: 50,
              type: "out"
            }
          ]
        },
        {
          id: "b",
          type: "component",
          label: "print",
          positionX: 400,
          positionY: 200,
          pins: [
            {
              id: "b0",
              type: "pin",
              name: "b0",
              side: "top",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "b1",
              type: "pin",
              name: "b1",
              side: "bottom",
              offsetPerc: 50,
              type: "in"
            }
          ]
        },
        {
          id: "a",
          type: "component",
          label: "counter",
          positionX: 600,
          positionY: 50,
          pins: [
            {
              id: "a0",
              type: "pin",
              name: "a0",
              side: "right",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "a1",
              type: "pin",
              name: "a1",
              side: "top",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "a2",
              type: "pin",
              name: "a2",
              side: "bottom",
              offsetPerc: 50,
              type: "out"
            }
          ]
        },
        {
          id: "d",
          type: "component",
          label: "test",
          positionX: 800,
          positionY: 100,
          pins: [
            {
              id: "d0",
              type: "pin",
              name: "a0",
              side: "right",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "d1",
              type: "pin",
              name: "a1",
              side: "top",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "d2",
              type: "pin",
              name: "a2",
              side: "bottom",
              offsetPerc: 50,
              type: "out"
            }
          ]
        },
        {
          id: "e",
          type: "component",
          label: "test 2",
          positionX: 800,
          positionY: 400,
          pins: [
            {
              id: "e0",
              type: "pin",
              name: "a0",
              side: "right",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "e1",
              type: "pin",
              name: "a1",
              side: "top",
              offsetPerc: 50,
              type: "out"
            },
            {
              id: "e2",
              type: "pin",
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
          type: "wire",
          from: "b1",
          to: "c2"
        },
        {
          id: "w2",
          type: "wire",
          from: "c0",
          to: "b0"
        },
        {
          id: "w3",
          type: "wire",
          from: "c1",
          to: "a0"
        },
        {
          id: "w4",
          type: "wire",
          from: "a1",
          to: "a2"
        }
      ]
    }
  }
}
