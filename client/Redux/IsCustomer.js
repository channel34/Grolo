import RoleAuthorization from "./RoleAuthorization";
import React from "react";

class IsCustomer extends React.Component {
  render() {
    const role = 5; // eslint-disable-line jsx-a11y/aria-role

    return <RoleAuthorization roleCode={role}>{this.props.children}</RoleAuthorization>;
  }
}

export default IsCustomer;
