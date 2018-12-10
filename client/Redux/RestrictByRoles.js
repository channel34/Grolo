import React from "react";
import { connect } from "react-redux";

class RestrictByRoles extends React.Component {
  render() {
    let visible = false;
    const { user } = this.props;
    if (user && user.userRoleIds) {
      const permittedUserRoleIds = this.props.roleIds.map(userRoleId => parseInt(userRoleId));
      visible =
        user.userRoleIds.filter(userRoleId => permittedUserRoleIds.includes(userRoleId)).length > 0;
    }
    return visible ? this.props.children : null;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(RestrictByRoles);
