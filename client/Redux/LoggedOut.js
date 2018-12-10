import React from "react";
import { connect } from "react-redux";

class LoggedOut extends React.Component {
  render() {
    const { user } = this.props;
    return user === false ? this.props.children : null;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(LoggedOut);
