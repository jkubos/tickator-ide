import React from 'react';

import {WorkArea} from "./work_area"

export default class ComponentEditor extends React.Component {
  render() {

    const style = {
      position: "absolute",
      top: this.props.area.y,
      left: this.props.area.x,
      width: this.props.area.width,
      height: this.props.area.height,
      background: "green"
    }

    return <div style={style}>
      <WorkArea
        data={this.context.store.getState().scene}
        dynamic={this.context.store.getState().dynamic}
        size={this.props.area.size()} />
    </div>
  }
}

ComponentEditor.propTypes = {
  top: React.PropTypes.number,
  left: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

ComponentEditor.defaultProps = {
};

ComponentEditor.contextTypes = {
  store: React.PropTypes.object.isRequired
};
