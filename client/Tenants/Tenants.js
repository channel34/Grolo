import React from "react";
import Search from "./Search";
import SubmitNew from "./SubmitNew";
import ShowAll from "./ShowAll";
import TenantEditor from "./TenantEditor";
import TenantInvite from "./TenantInvite";
import Landing from "./Landing";
import { Route, NavLink, Redirect } from "react-router-dom";
import styles from "./Tenants.module.css";
import "./Landing.css";
import { connect } from "react-redux";

class Tenants extends React.Component {
  state = {
    // user: this.props.user.roles
  };
  goToSearch = () => this.props.history.push("/admin/tenants/search");
  goToCreate = () => this.props.history.push("/admin/tenants/submit");
  render() {
    const prefix = this.props.match.path;
    return (
      <div className="tenantLanding">
        <div className="row">
          <h1>
            <NavLink to={prefix}>Tenants/Agencies</NavLink>
          </h1>
          <div className={styles.navLinks}>
            <NavLink to={prefix + "/submit"}>Create</NavLink>
            ||
            <NavLink to={prefix + "/search"}>Search</NavLink>
          </div>
          {/* <button onClick={this.goToCreate}>Create</button>
          <button onClick={this.goToSearch}>Search</button> */}
        </div>

        <div>
          <Route path={prefix + "/invite/:tenantId(\\d+)"} component={TenantInvite} />
          <Route path={prefix} component={Landing} />
          <Route exact path={prefix + "/submit"} component={SubmitNew} />
          <Route exact path={prefix + "/showAll"} component={ShowAll} />
          <Route exact path={prefix + "/search"} component={Search} />
          <Route exact path={prefix + "/edit/:tenantId(\\d+)"} component={TenantEditor} />
          <Route exact path={prefix + "/home"} component={Landing} />
          <Redirect to={prefix + "/home"} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    currentBusiness: state.currentBusiness
  };
}

export default connect(mapStateToProps)(Tenants);
