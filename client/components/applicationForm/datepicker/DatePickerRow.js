import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Icon from '../../Icons';
import {Form} from 'react-bootstrap';

class DatePickerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: null,
      toDate: null,
      shouldRender: true,
    };
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }
  changeFromDate(newDate) {
    let state = this.state;
    state['fromDate'] = newDate;
    this.setState(state);
  }
  changeToDate(newDate) {
    let state = this.state;
    state['toDate'] = newDate;
    this.setState(state);
  }
  deleteRow() {
    this.setState({shouldRender: false});
  }
  render() {
    if (!this.state.shouldRender) return null;
    return (
      <Form.Group className={'w-100 row mt-2'}>
        <div className="col-5">
          <DatePicker
            autoComplete={'off'}
            selected={this.state.fromDate}
            className={'w-100'}
            onChange={this.changeFromDate}
            name={'availableFrom'}
            placeholderText="Select from date"
          />
        </div>
        <div className="col-5 m-0">
          <DatePicker
            autoComplete={'off'}
            selected={this.state.toDate}
            className={'w-100'}
            onChange={this.changeToDate}
            name={'availableTo'}
            placeholderText="Select to date"
          />
        </div>
        <div className="col">
          <Button variant={'outline-danger'} className={'w-100'} onClick={this.deleteRow}>
            <Icon icon={'bin2'} />
          </Button>
        </div>
      </Form.Group>
    );
  }
}
export default DatePickerRow;
