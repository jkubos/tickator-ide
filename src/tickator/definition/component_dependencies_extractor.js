import Validate from '~/src/util/validate'

export default class ComponentDependenciesExtractor {
  constructor() {
    this._dependencies = []
  }

  getDependencies() {
    return this._dependencies
  }

  instance(block) {
    const refDependencies = this._dependencies
    block({
      name(nameVal) {
      },
      component(componentVal) {
        Validate.notBlank(componentVal)

        if (!refDependencies.includes(componentVal)) {
          refDependencies.push(componentVal)
        }
      },
      ticklet(tickletVal) {
      },
      x(xVal) {
      },
      y(yVal) {
      },
      property(propertyVal) {
      }
    })
  }

  name(nameVal) {

  }

  connect(block) {

  }

  property(block) {

  }
}
