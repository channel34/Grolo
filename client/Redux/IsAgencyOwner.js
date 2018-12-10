import RoleAuthorization from "./RoleAuthorization";
import React from "react";

class IsAgencyOwner extends React.Component {
  render() {
    const role = 4; // eslint-disable-line jsx-a11y/aria-role

    return <RoleAuthorization roleCode={role}>{this.props.children}</RoleAuthorization>;
  }
}

export default IsAgencyOwner;
