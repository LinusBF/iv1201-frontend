import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import Icon from '../../../Icons';
import {Form} from 'react-bootstrap';

class DatePickerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: null,
      toDate: null,
      shouldRender: true,
      dateError: true,
    };
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.checkDateError = this.checkDateError.bind(this);
  }
  changeFromDate(newDate) {
    let state = this.state;
    state['fromDate'] = newDate;
    this.setState(state);
    this.checkDateError();
  }
  changeToDate(newDate) {
    let state = this.state;
    state['toDate'] = newDate;
    this.setState(state);
    this.checkDateError();
  }
  checkDateError() {
    const fromDate = new Date(this.state.fromDate);
    const toDate = new Date(this.state.toDate);
    if (toDate < fromDate && this.state.fromDate && this.state.toDate) {
      // eslint-disable-next-line react/jsx-key
      return [
        <div key={'err-orderDates'} className={'w-100 error'}>
          Start date must be before end date...
        </div>,
      ];
    }
    if (fromDate < new Date() && this.state.fromDate) {
      // eslint-disable-next-line react/jsx-key
      return [
        <div key={'err-pastDates'} className={'w-100 error'}>
          Dates in the past are not valid...
        </div>,
      ];
    }
    return null;
  }
  deleteRow() {
    this.setState({shouldRender: false});
  }
  render() {
    if (!this.state.shouldRender) return null;
    const dateError = this.checkDateError();
    return (
      <Form.Group className={'w-100 row mt-2'}>
        <div className='col-5'>
          <DatePicker
            dateFormat='yyyy/MM/dd'
            autoComplete={'off'}
            selected={this.state.fromDate}
            className={'w-100'}
            onChange={this.changeFromDate}
            name={`availableFrom-${this.props.index}`}
            placeholderText='Select from date'
          />
        </div>
        <div className='col-5 m-0'>
          <DatePicker
            dateFormat='yyyy/MM/dd'
            autoComplete={'off'}
            selected={this.state.toDate}
            className={'w-100'}
            onChange={this.changeToDate}
            name={`availableTo-${this.props.index}`}
            placeholderText='Select to date'
          />
        </div>
        <div className='col-2 p-0'>
          <Button variant={'outline-danger'} className={'w-100'} onClick={this.deleteRow}>
            <Icon icon={'bin2'} />
          </Button>
        </div>
        {dateError}
      </Form.Group>
    );
  }
}
export default DatePickerRow;
