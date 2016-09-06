import React from 'react';

import ComponentEditor from "./component_editor"
import Rectangle from "../geom/rectangle"

export default class MainFrame extends React.Component {
  render() {
    const style = {
      position: "absolute",
      top: 0,
      left: 0,
      width: this.props.width,
      height: this.props.height,
      background: "#ccc"
    }

    return <div style={style}>
        <ComponentEditor
          componentData={this.props.dispatcher.data().xxx}
          area={new Rectangle(200, 10, this.props.width-200-10, this.props.height-10-10)}
          />
      </div>;
  }

  getChildContext() {
    return {dispatcher: this.props.dispatcher};
  }
}

MainFrame.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  dispatcher: React.PropTypes.object.isRequired
};

MainFrame.defaultProps = {
};

MainFrame.childContextTypes = {
  dispatcher: React.PropTypes.object.isRequired
};
