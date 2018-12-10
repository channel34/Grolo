import React from "react";
import { submitTenant } from "../../services/tenant.service";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import ImageUploader from "../../shared/ImageUploader";
import UserSelect from "../../shared/UserSelect";

class SubmitNew extends React.Component {
  state = {
    companyName: "",
    websiteUrl: "",
    description: "",
    appUserId: 1,
    imageUrl: ""
  };
  imageUploaderRef = React.createRef();

  componentDidMount() {
    this.setState({ appUserId: this.props.user.id });
  }

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  handleSubmitClick = () => {
    const { companyName, websiteUrl, description, appUserId, imageUrl } = this.state;

    submitTenant({ companyName, websiteUrl, description, appUserId, imageUrl }).then(
      this.props.history.push("/admin/tenants/search")
    );
  };

  ownerSelected = id => this.setState({ ownerId: id.value });

  render() {
    const { companyName, websiteUrl, description } = this.state;

    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="companyName">Company Name</Label>
            <Input
              type="text"
              name="companyName"
              value={companyName}
              onChange={this.handleInputChange}
              placeholder="Company Name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="websiteUrl">Website URL</Label>
            <Input
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              value={websiteUrl}
              onChange={this.handleInputChange}
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
              value={description}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">Profile Image</Label>
            <ImageUploader
              ref={this.imageUploaderRef}
              onComplete={url => this.setState({ imageUrl: url })}
            />
          </FormGroup>
          <div className="row">
            <Button
              //      type="submit"
              value="submit"
              className="btn btn-success"
              onClick={this.handleSubmitClick}
            >
              <i className="icon-note" /> Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(SubmitNew);
