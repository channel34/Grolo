import RoleAuthorization from "./RoleAuthorization";
import React from "react";

class IsAccountRep extends React.Component {
  render() {
    const role = 2; // eslint-disable-line jsx-a11y/aria-role

    return <RoleAuthorization roleCode={role}>{this.props.children}</RoleAuthorization>;
  }
}

export default IsAccountRep;
