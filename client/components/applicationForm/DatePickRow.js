import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {Form} from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Icon from '../Icons';

class DatePickRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
    };

    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  changeFromDate(date) {
    this.setState({
      fromDate: date,
      toDate: this.state.toDate,
    });
    this.props.updateDate(date, 'updateFrom');
  }
  changeToDate(date) {
    this.setState({
      fromDate: this.state.fromDate,
      toDate: date,
    });
    this.props.updateDate(date, 'updateTo');
  }
  deleteRow(event) {
    event.preventDefault();
    this.props.updateDate(null, 'delete');
  }

  render() {
    return (
      <Form.Group className={'w-100 row mt-2'}>
        <div className="col-5">
          <DatePicker
            selected={this.state.fromDate}
            className={'w-100'}
            name={'availableFrom'}
            onChange={this.changeFromDate}
            placeholderText="Select from date"
          />
        </div>
        <div className="col-5 ml-2">
          <DatePicker
            selected={this.state.toDate}
            className={'w-100'}
            name={'availableTo'}
            onChange={this.changeToDate}
            placeholderText="Select to date"
          />
        </div>
        <div className="col-1">
          <Button variant={'outline-danger'} onClick={this.deleteRow}>
            <Icon icon={'bin2'} />
          </Button>
        </div>
      </Form.Group>
    );
  }
}
export default DatePickRow;
