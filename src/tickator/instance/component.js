import Validate from '~/src/util/validate'
import Dispatcher from '~/src/tickator/dispatcher'
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import Property from '~/src/tickator/instance/property'

export default class Component {
  constructor(dispatcher, instanceDefinition, parent) {
    Validate.isA(dispatcher, Dispatcher)
    Validate.isA(instanceDefinition, InstanceDefinition)
    Validate.valid(instanceDefinition.component()!==undefined, 'Component expected, got ticklet!')

    if (parent) {
      Validate.isA(parent, Component)
    }

    this._dispatcher = dispatcher
    this._instanceDefinition = instanceDefinition
    this._parent = parent
  }

  definition() {
    return this._instanceDefinition.definition()
  }

  instanceDefinition() {
    return this._instanceDefinition
  }

  properties() {
    return this._properties
  }

  propertiesMap() {
    let res = {}

    Object.keys(this._properties).forEach(name=>res[name] = this._properties[name]())

    return res
  }

  propertyInstances() {
    return this._propertyInstances
  }

  build() {
    this._buildProperties()
    this._buildInstances()
  }

  wireUp() {
    console.log("In ############################# "+this._instanceDefinition.definition().name());
    this._instanceDefinition.component().connections().forEach(connection=>{

      if (connection.fromInstance()) {
        const instanceFrom = this._findInstance(connection.fromInstance())

        if (instanceFrom.instanceDefinition().definition().type()==='ticklet') {
          const output = instanceFrom.out()[connection.fromOutput()]()

          const inputs = this._findOppositeInputs(connection)

          if (inputs.length>0) {
            console.log(inputs.length+" opposite inputs found, wiring");

            inputs.forEach(input=>{
              output.addDepending(input)
              input.bind(output)
            })
          } else {
            console.log("Opposite ticklet not found, ignoring");
          }
        }
      }
    })

    this._instances.forEach(instance=>{
      if (instance.instanceDefinition().definition().type()==='component') {
        instance.wireUp()
      }
    })
  }

  _findOppositeInputs(connection) {

    //connected to something inside of this component
    if (connection.toInstance()) {
      const instanceTo = this._findInstance(connection.toInstance())

      //connected to ticklet, return it
      if (instanceTo.instanceDefinition().definition().type()==='ticklet') {
        return [instanceTo.in()[connection.toInput()]()]
      //connected to component, dive to i
      } else {
        const res = []

        instanceTo._findConnectionsFromInputPort(connection.toInput()).forEach(subConnection=>{
          res.push(...instanceTo._findOppositeInputs(subConnection))
        })

        return res
      }
    //connected to output port of *this* component, dive outside
    } else {
      const res = []

      //if there is parent that can be checked
      if (this._parent) {
        this._parent._findConnectionsToFromInstance(this._instanceDefinition.name(), connection.toInput())
        .forEach(subConnection=>{
          res.push(...this._parent._findOppositeInputs(subConnection))
        })
      }

      return res
    }
  }

  _findConnectionsFromInputPort(inputName) {
    return this._instanceDefinition.component().connections().filter(connection=>{
      return connection.fromInstance()===null && connection.fromOutput()===inputName
    })
  }

  _findConnectionsToFromInstance(instanceName, outputName) {
    return this._instanceDefinition.component().connections().filter(connection=>{
      return connection.fromInstance()===instanceName && connection.fromOutput()===outputName
    })
  }

  _buildInstances() {
    this._instances = this._instanceDefinition.component().instances().map(instance=>{
      if (instance.component()) {
        const component = new Component(this._dispatcher, instance, this)
        component.build()
        return component
      } else if (instance.ticklet()) {
        const klass = instance.ticklet().klass()
        const ticklet = new klass(this._dispatcher, instance, this)
        ticklet.initialize()

        if (instance.ticklet().autostart()) {
          this._dispatcher.schedule(ticklet)
        }

        return ticklet
      } else {
        throw `Unknown instance type ${instance.type()}`
      }
    })
  }

  _findInstance(name) {
    Validate.notBlank(name)

    const res = this._instances.filter(instance=>instance.instanceDefinition().name()===name)

    Validate.ofSize(res, 1, `Found ${res.length} instances with name ${name}, expected exactly one`)

    return res[0]
  }

  _buildProperties() {
    this._properties = {}

    const parentProperties = this._parent ? this._parent.propertiesMap() : {}

    this._propertyInstances = this._instanceDefinition.properties().map(instanceProperty=>{
      const property = new Property(instanceProperty, parentProperties)
      this._properties[instanceProperty.definition().name()] = ()=>property.value()
      return property
    })
  }
}
