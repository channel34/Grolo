import React from "react";

import SubLanding from "./SubLanding";
import { connect } from "react-redux";
import LoggedIn from "../Redux/LoggedIn";

class Subscriptions extends React.Component {
  render() {
    const prefix = this.props.match.path;
    return (
      <div>
        <LoggedIn>
          <SubLanding id={this.props.currentBusiness} />
        </LoggedIn>
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

export default connect(mapStateToProps)(Subscriptions);
