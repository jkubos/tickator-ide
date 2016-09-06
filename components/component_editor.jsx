import React from 'react';

import {WorkArea} from "./work_area"

export default class ComponentEditor extends React.Component {
  render() {

    const style = {
      position: "absolute",
      top: this.props.top,
      left: this.props.left,
      width: this.props.width,
      height: this.props.height,
      background: "green"
    }

    return <div style={style}>
      <WorkArea
        data={this.props.componentData}
        size={this.props.area.size()} />
    </div>
  }
}

ComponentEditor.propTypes = {
  componentData: React.PropTypes.object,
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

ComponentEditor.defaultProps = {
};

ComponentEditor.contextTypes = {
  dispatcher: React.PropTypes.object.isRequired
};
