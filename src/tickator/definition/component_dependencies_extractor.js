import {Validate} from '~/src/util/validate'

export class ComponentDependenciesExtractor {
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
      },
      inputPosition(name, side, ratio) {
      },
      outputPosition(name, side, ratio) {
      }
    })
  }

  name(nameVal) {
  }

  connect(block) {
  }

  property(block) {
  }

  input(block) {
  }

  output(block) {
  }
}
