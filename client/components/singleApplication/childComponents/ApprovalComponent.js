import React, {Component} from 'react';

class ApprovalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.message = '';
    this.styling = this.setStyling(this.props.data);
    this.setStyling = this.setStyling.bind(this);
  }
  setStyling(approved) {
    console.log(approved);
    switch (approved) {
      case true:
        this.message = 'This application has been approved!';
        return 'accepted';
      case false:
        this.message = 'This application has been rejected.';
        return 'rejected';
      case null:
        this.message = 'Result pending...';
        return 'pending';
    }
  }
  render() {
    console.log(this.props.data);
    return (
      <div id={'statusColumn'} className="col-sm-4 p-0 m-2 m-sm-0">
        <div className={`card p-4 mt-0 ${this.styling}`}>
          <p>Application result</p>
          <div className="card m-0 p-2">
            <p>{this.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ApprovalComponent;
