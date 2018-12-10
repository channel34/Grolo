import React from "react";
import { updateCurrentBusiness } from "./ReduxHelper";
import { connect } from "react-redux";

class BusinessSelector extends React.Component {
  state = {
    currentBusinessId: null,
    currentBusinessName: "",
    businesses: null
  };
  componentDidMount() {
    const biz = this.props.user.businesses;
    if (biz) {
      this.setState({ currentBusinessId: biz[0].id });
      updateCurrentBusiness(biz[0].id);
    } else {
      updateCurrentBusiness(null);
    }
  }

  handleSelectChange = e => {
    const value = e.target.value;
    updateCurrentBusiness(value);
  };

  render() {
    return (
      <div>
        {this.props.user.businesses && (
          <div>
            <span className="mr-2">Select Business</span>
            <select
              name="businessSelect"
              onChange={this.handleSelectChange}
              defaultValue={this.state.currentBusinessName}
            >
              {this.props.user.businesses.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(BusinessSelector);
