import React, {Component} from 'react';

class PersonalDetailsViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.data);
    return (
      <div id="personalDetails">
        <div className="row">
          <div className="col pr-1">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Name</div>
              </div>
              <input
                disabled
                type="text"
                name={'firstName'}
                value={this.props.data.firstName}
                className="form-control"
              />
            </div>
          </div>
          <div className="col pl-1">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Surname</div>
              </div>
              <input
                disabled
                type="text"
                name={'lastName'}
                value={this.props.data.lastName}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">SSN</div>
          </div>
          <input
            disabled
            type="text"
            name={'ssn'}
            value={this.props.data.ssn}
            className="form-control"
          />
        </div>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">Email</div>
          </div>
          <input
            disabled
            type="email"
            name={'email'}
            value={this.props.data.email}
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

export default PersonalDetailsViewComponent;
