import React from "react";
import { searchTenants } from "../../services/tenant.service";
import { inviteTenant } from "../../services/appuser.service";
import { withRouter } from "react-router-dom";
import Paginator from "../../shared/Paginator";
import { CardBody, CardTitle, CardText, Card, CardImg, Button } from "reactstrap";
import TenantInvite from "./TenantInvite";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";

class SearchTenants extends React.Component {
  state = {
    searchText: "",
    searchData: null,
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    tenantId: null,
    modalShow: false,
    role: "",
    email: ""
  };

  componentDidMount = () => {
    searchTenants(0, 15, "").then(response => {
      this.setState({
        searchData: response.data.item.pagedItems,
        totalPages: response.data.totalPages
      });
    });
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  handleSearchClick = () => {
    const { searchText, pageIndex, pageSize } = this.state;
    searchTenants(pageIndex, pageSize, searchText).then(response => {
      this.setState({
        searchData: response.data.item.pagedItems,
        totalPages: response.data.totalPages
      });
    });
  };
  handleEditClicked = id => {
    this.props.history.push("edit/" + id);
  };
  handleInviteClicked = id => {
    this.setState({
      modalShow: !this.state.modalShow,
      tenantId: id
    });
  };
  handleSendInviteClicked = () => {
    const { role, email, tenantId } = this.state;
    inviteTenant({ role, email, tenantId }).then(response => {
      NotificationManager.success(" you just sent you an email");
    });
  };
  goToPage = pageIndex => {
    this.setState(
      prev => ({ pageIndex }),
      () => {
        this.executeQuery(0);
      }
    );
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  handleRoleChange = e => {
    this.setState({
      role: e.target.value
    });
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-12 mb-1">
            <fieldset className="form-group round">
              <label htmlFor="html">Search Tenants</label>
              <input
                type="text"
                className="form-control round"
                name="searchText"
                value={this.state.searchText}
                onChange={this.handleInputChange}
                placeholder="Search"
              />
            </fieldset>
          </div>
          <div />
        </div>
        <button type="button" className="btn btn-success" onClick={this.handleSearchClick}>
          <i className="icon-note" /> Search
        </button>
        <div>
          <div className="resultContainer">
            {this.state.searchData && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                  {this.state.searchData.map(tenant => (
                    <Card
                      key={tenant.id}
                      className="card px-1 py-1 my-1 border-left border-primary border-1 "
                    >
                      <CardImg src={tenant.imageUrl} />
                      <CardBody>
                        <CardTitle>{tenant.companyName}</CardTitle>
                        <CardText>Description: {tenant.description}</CardText>
                        <CardText>
                          <a href={tenant.websiteUrl}>Website </a>
                        </CardText>
                        <CardText />{" "}
                        <Button color="info" onClick={() => this.handleEditClicked(tenant.id)}>
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => this.handleInviteClicked(tenant.id)}
                        >
                          Invite
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </div>

                <Paginator
                  currentPage={this.state.pageIndex}
                  totalPages={this.state.totalPages}
                  goTo={this.goToPage}
                  style={{ marginTop: "16px" }}
                  className="m-2"
                />
              </div>
            )}
          </div>
        </div>
        {this.state.modalShow && (
          <TenantInvite
            toggleModal={this.state.modalShow}
            toggle={this.toggleModal}
            onChangeEmail={this.handleEmailChange}
            email={this.state.email}
            onChangeRole={this.handleRoleChange}
            role={this.state.role}
          >
            <Button color="primary" type="button" onClick={this.handleSendInviteClicked}>
              Send
            </Button>
            <Button color="danger" type="button" onClick={this.handleInviteClicked}>
              Cancel
            </Button>
          </TenantInvite>
        )}
      </div>
    );
  }
}

export default withRouter(SearchTenants);
