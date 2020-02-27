import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class ApprovalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approval: 'pending',
      message: 'Result pending...',
      styling: 'pending',
    };
    this.setStyling = this.setStyling.bind(this);
    this.sendApproval = this.sendApproval.bind(this);
    this.isUserAdmin = true;
  }

  componentDidMount() {
    this.setStyling(this.props.approved);
  }

  setStyling(approved) {
    switch (approved) {
      case 'approved':
        this.setState({
          ...this.state,
          approval: approved,
          message: 'This application has been approved!',
          styling: 'accepted',
        });
        break;
      case 'rejected':
        this.setState({
          ...this.state,
          approval: approved,
          message: 'This application has been rejected.',
          styling: 'rejected',
        });
        break;
      case 'pending':
        this.setState({
          ...this.state,
          approval: approved,
          message: 'Result pending...',
          styling: 'pending',
        });
    }
  }
  sendApproval(status) {
    console.log(`Updating status of application to ${status}`);
    axios
      .post('/update-approval', {
        token: this.props.idToken,
        applicationId: this.props.applicationId,
        oldStatus: this.props.approved,
        newStatus: status,
      })
      .then(() => {
        this.setStyling(status);
      });
  }
  renderAdminStuff() {
    return (
      <div className={'row m-0 p-0 pt-2 mt-2'}>
        <Button block key={1} variant='primary' onClick={() => this.sendApproval('approved')}>
          Approve
        </Button>
        <Button block key={2} variant='danger' onClick={() => this.sendApproval('rejected')}>
          Reject
        </Button>
      </div>
    );
  }

  render() {
    const adminStuff =
      this.isUserAdmin && this.state.approval === 'pending' ? this.renderAdminStuff() : null;
    return (
      <div id={'statusColumn'} key={'status'} className='col-sm-4 p-0 m-2 m-sm-0'>
        <div className={`card p-4 mt-0 ${this.state.styling}`}>
          <p>Application result</p>
          <div className='card m-0 p-2'>
            <p>{this.state.message}</p>
          </div>
          {adminStuff}
        </div>
      </div>
    );
  }
}

export default ApprovalComponent;
