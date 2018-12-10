import React from "react";
import { getTenantById, updateTenant, deleteTenant } from "../../services/tenant.service";
import PropTypes from "prop-types";
import Confirmation from "../../shared/Confirmation";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class TenantEditor extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };
  state = {
    tenant: {
      id: null,
      companyName: "",
      description: "",
      imageUrl: ""
    },
    showDeleteConfirmation: false
  };

  componentDidMount() {
    getTenantById(this.props.match.params.tenantId).then(response => {
      const tenant = response.data.item;
      this.setState({ tenant: tenant });
    });
  }

  updateTenantInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(state => ({
      tenant: {
        ...state.tenant,
        [name]: value
      }
    }));
  };

  handleSaveClicked = () => {
    const { tenant } = this.state;
    const payload = {
      ...tenant
    };
    updateTenant(payload).then(() => this.props.history.push("/admin/tenants/search"));
  };

  handleDeleteClicked = () => {
    const { tenant } = this.state;
    deleteTenant(tenant.id).then(this.props.history.push("/admin/tenants/search"));
  };

  closeDeleteConfirmation = () => {
    this.setState({ showDeleteConfirmation: false });
  };
  render() {
    const { tenant } = this.state;
    return (
      <div>
        {this.state.tenant && (
          <div>
            <Form>
              <FormGroup>
                <Label for="companyName">Company Name</Label>
                <Input
                  type="text"
                  name="companyName"
                  value={tenant.companyName}
                  onChange={this.updateTenantInput}
                  placeholder="Company Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="websiteUrl">Website URL</Label>
                <Input
                  type="text"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={tenant.websiteUrl}
                  onChange={this.updateTenantInput}
                  placeholder="Website URL"
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  rows="4"
                  placeholder="Description"
                  name="description"
                  value={tenant.description}
                  onChange={this.updateTenantInput}
                />
              </FormGroup>
              <FormGroup />
              <div className="row">
                <Button type="button" class="btn btn-success" onClick={this.handleSaveClicked}>
                  <i class="icon-note" /> Save
                </Button>
                <Confirmation
                  buttonLabel="Delete"
                  header="Are you sure?"
                  execute={this.handleDeleteClicked}
                >
                  {this.state.tenant.companyName} will be deleted from the list of tenants
                </Confirmation>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

export default function(props) {
  return <TenantEditor {...props} key={props.match && props.match.params.tenantId} />;
}
