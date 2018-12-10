import React from "react";
import { connect } from "react-redux";

class LoggedIn extends React.Component {
  render() {
    const { user } = this.props;
    return user ? this.props.children : null;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(LoggedIn);
