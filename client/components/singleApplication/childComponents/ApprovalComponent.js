import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class ApprovalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.message = '';
    this.styling = this.setStyling(this.props.approved);
    this.setStyling = this.setStyling.bind(this);
    this.sendApproval = this.sendApproval.bind(this);
    this.isUserAdmin = true;
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
  sendApproval() {
    return;
  }
  renderAdminStuff() {
    const HTML = [
      // eslint-disable-next-line react/jsx-key
      <div className={'row m-0 p-0 pt-2 mt-2'}>
        <Button
          block
          key={'approve'}
          name={'approve'}
          variant='primary'
          onClick={this.sendApproval('approve')}>
          Approve
        </Button>
        <Button
          block
          key={'reject'}
          name={'reject'}
          variant='danger'
          onClick={this.sendApproval('reject')}>
          Reject
        </Button>
      </div>,
    ];
    return HTML;
  }

  render() {
    const adminStuff =
      this.isUserAdmin && this.props.approved === null ? this.renderAdminStuff() : null;
    return (
      <div id={'statusColumn'} key={'status'} className='col-sm-4 p-0 m-2 m-sm-0'>
        <div className={`card p-4 mt-0 ${this.styling}`}>
          <p>Application result</p>
          <div className='card m-0 p-2'>
            <p>{this.message}</p>
          </div>
          {adminStuff}
        </div>
      </div>
    );
  }
}

export default ApprovalComponent;
