import React from "react";
import { connect } from "react-redux";
import IsAdmin from "./IsAdmin";

class RoleAuthorization extends React.Component {
  state = {
    auth: false
  };

  checkRole = roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].Code === this.props.roleCode) {
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    const auth = this.checkRole(this.props.user.userRoleIds);

    return auth ? this.props.children : null;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(RoleAuthorization);
