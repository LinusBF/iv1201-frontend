/* eslint-disable max-lines */
import React, {Component} from 'react';
import './ApplicationForm.css';
import data from './fakeSingleApplicationData';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import DatePickRow from './DatePickRow';

import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRows: [{fromDate: null, toDate: null}],
      expertises: data.expertises,
      expSelections: ['Select an expertise'],
      letter: 'Please write about yourself here.',
    };
    this.createLists = this.createLists.bind(this);
    this.addExpertiseRow = this.addExpertiseRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDatePickRow = this.addDatePickRow.bind(this);
    this.letterChange = this.letterChange.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }
  createLists(state) {
    const lists = [];
    state.expSelections.forEach((key, index) => {
      lists.push(
        <Form.Control
          name={'expertise'}
          onChange={() => {
            this.addExpertiseRow(this.state, key, index);
          }}
          as="select"
        >
          {this.createListOptions(state.expertises)}
        </Form.Control>
      );
    });
    return lists;
  }
  createListOptions(expertiseList) {
    let options = [<option key={0}>Select an expertise</option>];
    expertiseList.forEach((key, i) => {
      options.push(<option key={i + 1}>{key}</option>);
    });
    return options;
  }
  addExpertiseRow(state, key, index) {
    if (index === state.expSelections.length - 1) {
      this.setState({
        letter: state.letter,
        dateRows: state.dateRows,
        expertises: state.expertises,
        expSelections: state.expSelections.concat(['new item']),
      });
      this.forceUpdate();
    }
  }
  addDatePickRow(e) {
    e.preventDefault();
    this.setState({
      letter: this.state.letter,
      dateRows: this.state.dateRows.concat([{fromDate: null, toDate: null}]),
      expertises: this.state.expertises,
      expSelections: this.state.expSelections,
    });
    this.forceUpdate();
  }
  updateDate(i, val, action) {
    const newArray = [];
    switch (action) {
      case 'delete':
        console.log(`${action} ${i}`);
        this.state.dateRows.forEach((entry, index) => {
          if (index === i) return;
          newArray.push(entry);
        });
        console.log(`After delete: ${newArray.length}`);
        break;
      case 'updateFrom':
        this.state.dateRows.forEach((entry, index) => {
          if (index === i) {
            newArray.push({fromDate: val, toDate: this.state.dateRows[i].toDate});
            return;
          }
          newArray.push(entry);
        });
        break;
      case 'updateTo':
        this.state.dateRows.forEach((entry, index) => {
          if (index === i) {
            newArray.push({fromDate: this.state.dateRows[i].fromDate, toDate: val});
            return;
          }
          newArray.push(entry);
        });
        break;
      default:
        break;
    }

    console.log(newArray);
    this.setState({
      letter: this.state.letter,
      dateRows: newArray,
      expertises: this.state.expertises,
      expSelections: this.state.expSelections,
    });
  }
  letterChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const data = new FormData(event.target).entries();
    let entry;
    const valueArray = [];
    while ((entry = data.next()).done === false) {
      valueArray.push(entry.value);
    }
    console.log(valueArray);
  }

  render() {
    const datePickRows = [];
    for (let i = 0; i < this.state.dateRows.length; i++) {
      console.log(`New FromDate: ${this.state.dateRows[i].fromDate}`);
      console.log(`New toDate: ${this.state.dateRows[i].toDate}`);
      datePickRows.push(
        <DatePickRow
          key={i}
          updateDate={(val, action) => {
            this.updateDate(i, val, action);
          }}
          fromDate={this.state.dateRows[i].fromDate}
          toDate={this.state.dateRows[i].toDate}
        />
      );
    }
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <h5>Personal information</h5>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name={'firstName'}
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name={'lastName'}
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <input
                type="email"
                name={'email'}
                className="form-control"
                placeholder="Email adress"
              />
              <h5>Your expertise</h5>
              <div className="row w-100">
                <Form.Group id={'optionsContainer'} className={'w-100'}>
                  {this.createLists(this.state)}
                </Form.Group>
              </div>
              <h5>Your availability</h5>
              <div id={'availabilityContainer'} className="w-100">
                {datePickRows}
                <Button
                  onClick={this.addDatePickRow}
                  className={'mt-2'}
                  variant="primary"
                  size="md"
                  block
                >
                  Add row
                </Button>
              </div>
              <h5>Perdonal Letter</h5>
              <div id={'availabilityContainer'} className="w-100">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    value={this.state.letter}
                    onChange={this.letterChange}
                    as="textarea"
                    rows="3"
                  />
                </Form.Group>
              </div>
              <Button type={'submit'} variant={'primary'} size={'md'} className={'mt-2'} block>
                Submit application
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationForm;
