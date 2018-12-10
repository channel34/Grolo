import React from "react";
import { connect } from "react-redux";

class UserName extends React.Component {
  render() {
    return (
      <div className="h4">
        {this.props.user ? this.props.user.firstName + " " + this.props.user.lastName : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserName);
