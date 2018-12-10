import React from "react";
import { unsubscribe } from "../../services/stripe.service";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Confirmation from "../../shared/Confirmation";
class CancelSubscription extends React.Component {
  state = {
    businessId: 3,
    showCancel: true
  };

  handleUnsubscribeClick = () => {
    unsubscribe({ businessId: this.props.businessId })
      .then(this.setState({ showCancel: false }))
      .then(this.props.getInfo());
  };
  toggle = () => {
    this.setState({
      showConfirm: !this.state.showConfirm
    });
  };

  render() {
    return (
      <div>
        {this.state.showCancel && (
          <Confirmation
            buttonLabel="Cancel Subscription"
            header="Are you sure you want to unsubscribe?"
            execute={this.handleUnsubscribeClick}
          >
            Your current subscription will end {moment(this.props.endDate).format("MMMM Do YYYY")}{" "}
            and will not automatatically renew
          </Confirmation>
        )}
      </div>
    );
  }
}

export default withRouter(CancelSubscription);
