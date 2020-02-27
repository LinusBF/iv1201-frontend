import React, {Component} from 'react';

class FormWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-sm-8 p-0 pr-md-3 m-2 m-sm-0'>
            <div className='card p-5 mt-0'>{this.props.children}</div>
          </div>
          {this.props.sidebar}
        </div>
      </div>
    );
  }
}

export default FormWrapper;
