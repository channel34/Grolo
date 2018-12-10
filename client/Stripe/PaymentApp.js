import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

class PaymentApp extends React.Component {
  state = {
    subscriptionId: "",
    email: "",
    isValid: true
  };

  componentDidMount() {
    //get user info, run getsubscriptioninfo
  }
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, this.checkValidity);
  };

  checkValidity = () => {
    if (this.state.subscriptionId === this.props.subLevel) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  };

  render() {
    const businessId = this.props.businessId;
    return (
      <div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrap bar-warning">
                <h4 className="card-title" id="hidden-label-colored-controls">
                  Update your Grolo Account
                </h4>
              </div>
            </div>
            <div className="card-body">
              <div className="px-3">
                <form className="form">
                  <div className="form-body">
                    <h4 className="form-section">
                      <i className="icon-direction" /> Choose Subscription
                    </h4>

                    <div className="row" />

                    <div className="form-group col-md-12 mb-2">
                      <fieldset className="form-group">
                        <label htmlFor="customSelect">Subscription Type</label>
                        <select
                          className="custom-select d-block w-300"
                          id="customSelect"
                          name="subscriptionId"
                          value={this.state.subscriptionId}
                          onChange={this.handleInputChange}
                        >
                          <option value="" defaultValue>
                            Click here
                          </option>

                          <option value="2">Level 2 Gold - $49.99/month</option>
                          <option value="3">Level 3 Platinum - $149.99/month</option>
                        </select>
                      </fieldset>
                      {!this.state.isValid && (
                        <div>You are already subscribed to level {this.props.subLevel}</div>
                      )}
                    </div>
                  </div>{" "}
                  {this.state.isValid && (
                    <div>
                      <h4 className="form-section">
                        <i className="icon-direction" /> Payment Information
                      </h4>
                      <div className="form-group col-md-6 mb-2">
                        <StripeProvider apiKey="pk_test_dNyrzuerXkArSSFTIGK7k6hj">
                          <div className="stripePay">
                            <Elements>
                              <CheckoutForm
                                subscriptionId={this.state.subscriptionId}
                                email={this.state.email}
                                businessId={businessId}
                                getInfo={this.props.getInfo}
                                hide={this.props.hide}
                              />
                            </Elements>
                          </div>
                        </StripeProvider>
                        {/* <button onClick={this.props.hide}>Close</button> */}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentApp;
