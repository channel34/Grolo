import React from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
class TenantInvite extends React.Component {
  render() {
    return this.props.toggleModal ? (
      <div>
        <Modal isOpen={this.props.toggleModal}>
          <ModalHeader />
          <ModalBody>
            <Form>
              <h3>Invite User to Tenant</h3>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  value={this.props.email}
                  onChange={this.props.onChangeEmail}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    value="acctRep"
                    checked={this.props.role === "acctRep"}
                    onChange={this.props.onChangeRole}
                  />{" "}
                  Invite as Rep
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    value="admin"
                    checked={this.props.role === "admin"}
                    onChange={this.props.onChangeRole}
                  />
                  Invite as Admin
                </Label>
              </FormGroup>
            </Form>
            {this.props.children}
          </ModalBody>
        </Modal>
      </div>
    ) : null;
  }
}
export default TenantInvite;
