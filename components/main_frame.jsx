import React from 'react';

import ComponentEditor from "./component_editor"
import NamespaceTree from '../src/ui/namespace-tree/namespace-tree'
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
          area={new Rectangle(400, 10, this.props.width-400-10, this.props.height-10-10)}
          />
        <NamespaceTree
          area={new Rectangle(10, 10, 380, this.props.height-10-10)}
          />
      </div>;
  }

  getChildContext() {
    return {store: this.props.store};
  }
}

MainFrame.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  store: React.PropTypes.object.isRequired
};

MainFrame.defaultProps = {
};

MainFrame.childContextTypes = {
  store: React.PropTypes.object.isRequired
};
