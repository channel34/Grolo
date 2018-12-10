import React from "react";

import { CardElement, injectStripe } from "react-stripe-elements";
import { newSubscription } from "../../services/stripe.service";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CheckoutForm extends React.Component {
  state = {
    complete: false,
    isUpdate: false
  };
  // constructor(props) {
  //   super(props);
  //   this.state = { complete: false };
  //   this.submit = this.submit.bind(this);
  // } 4 types of subscription status
  submit = ev => {
    this.props.stripe.createToken({ name: "Name" }).then(response => {
      console.log(response.token.id);
      newSubscription({
        stripeToken: response.token.id,
        subscriptionLevel: this.props.subscriptionId,
        tenantId: this.props.user.tenantId,
        email: this.props.user.email,
        BusinessId: this.props.businessId
      }).then(response => {
        console.log(response);
        this.props.getInfo();

        if (response.ok) this.setState({ complete: true });
      });
    });
  };

  render() {
    return (
      <div>
        <div className="checkout">
          <CardElement />
          <button type="button" className="btn btn-success" onClick={this.submit}>
            <i className="icon-note" /> Confirm
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default injectStripe(withRouter(connect(mapStateToProps)(CheckoutForm)));
