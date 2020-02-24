import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {Form} from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

class DatePickRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
    };
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
  }

  changeFromDate(date) {
    this.setState({
      fromDate: date,
      toDate: this.state.toDate,
    });
  }
  changeToDate(date) {
    this.setState({
      fromDate: this.state.fromDate,
      toDate: date,
    });
  }

  render() {
    return (
      <Form.Group className={'w-100 justify-content-sm-center row'}>
        <div className="col-5">
          <DatePicker
            selected={this.state.fromDate}
            className={'w-100'}
            name={'availableFrom'}
            onChange={this.changeFromDate}
            placeholderText="Select from date"
          />
        </div>
        <div className="col-2">
          <p>to:</p>
        </div>
        <div className="col-5">
          <DatePicker
            selected={this.state.toDate}
            className={'w-100'}
            name={'availableTo'}
            onChange={this.changeToDate}
            placeholderText="Select to date"
          />
        </div>
      </Form.Group>
    );
  }
}
export default DatePickRow;
