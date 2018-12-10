import React from "react";
import { getSubscriptionInfo } from "../../services/stripe.service";
import CancelSubscription from "./CancelSubscription";
import moment from "moment";
import PaymentApp from "./PaymentApp";
import { Card } from "reactstrap";

import { connect } from "react-redux";

class SubLanding extends React.Component {
  state = {
    subInfo: [],
    businessId: null,
    showPayment: false
  };

  componentDidMount() {
    this.getInfo();
    this.setState({ businessId: this.props.id });
  }

  componentDidUpdate = prevProps => {
    if (prevProps.id !== this.props.id) {
      this.getInfo();
    }
  };

  handleUpgradeClick = () => this.setState({ showPayment: true });
  hidePayment = () => {
    this.setState({ showPayment: false });
  };
  getInfo = () => {
    getSubscriptionInfo(this.props.id).then(response => {
      this.setState({ subInfo: response.data.item });
    });
  };
  hidePaymentApp = () => this.setState({ showPayment: false });

  render() {
    return (
      <div>
        <Card>
          {/* <div>ID: {this.props.user.id}</div> */}

          <div>
            <h1> Current Subscription </h1>
            {!this.state.subInfo && (
              <div>
                You are not currently subscribed to Grolo.{" "}
                <a onClick={() => this.setState({ showPayment: true })} style={{ color: "blue" }}>
                  Click here to subscribe
                </a>
              </div>
            )}
            {this.state.subInfo && (
              <div>
                <div>Subscription Level : {this.state.subInfo.subscriptionLevel} </div>
                <div>
                  Start Date : {moment(this.state.subInfo.startDate).format("MMMM Do YYYY")}
                </div>
                {this.state.subInfo.dateCancelled && (
                  <div>Ends on : {moment(this.state.subInfo.endDate).format("MMMM Do YYYY")}</div>
                )}
                {!this.state.subInfo.dateCancelled && (
                  <div>Renews on : {moment(this.state.subInfo.endDate).format("MMMM Do YYYY")}</div>
                )}
              </div>
            )}
          </div>
          {this.state.showPayment && !this.state.subInfo && (
            <PaymentApp
              getInfo={this.getInfo}
              hide={this.hidePaymentApp}
              businessId={this.state.businessId}
            />
          )}
          <div className="row">
            {this.state.subInfo && !this.state.showPayment && (
              <button type="button" className="btn btn-success" onClick={this.handleUpgradeClick}>
                Update Subscription
              </button>
            )}
            {this.state.subInfo && !this.state.subInfo.dateCancelled && (
              <div>
                <CancelSubscription
                  businessId={this.state.businessId}
                  endDate={this.state.subInfo.endDate}
                  getInfo={this.getInfo}
                />
              </div>
            )}
          </div>
        </Card>
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

export default connect(mapStateToProps)(SubLanding);
