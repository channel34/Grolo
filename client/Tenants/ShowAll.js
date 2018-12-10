import React from "react";
import { getAllTenants } from "../../services/tenant.service";

class ShowAll extends React.Component {
  state = {
    allTenants: [],
    pageSize: 10,
    pageIndex: 0,
    editId: ""
  };

  componentDidMount() {
    getAllTenants(this.state.pageIndex, this.state.pageSize).then(response =>
      this.setState({ allTenants: response.data.item.pagedItems })
    );
  }
  handleEditClicked = id => {
    this.props.history.push("edit/" + id);
  };

  render() {
    return (
      <div>
        <div class="row taskboard">
          <div class="col-md-3 col-12">
            {this.state.allTenants && (
              <div>
                {this.state.allTenants.map(tenant => (
                  <div class="container" id="drag-todos">
                    <div class="card border-left my-4 border-primary border-3">
                      <div class="card-block pt-3">
                        <div class="clearfix">
                          <div>
                            <div key={tenant.id}>
                              <div>Company Name: {tenant.companyName}</div>

                              <div>
                                <a href={tenant.websiteUrl}>Website</a>
                              </div>
                              <div>
                                Description:
                                {tenant.description}
                              </div>
                              <div>
                                <button onClick={() => this.handleEditClicked(tenant.id)}>
                                  Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowAll;
