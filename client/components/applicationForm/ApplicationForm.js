/* eslint-disable max-lines */
import React, {Component} from 'react';
import './ApplicationForm.css';
import data from './fakeSingleApplicationData';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import DatePickRow from './DatePickRow';

import 'react-datepicker/dist/react-datepicker.css';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRows: [{fromDate: null, toDate: null}],
      expertises: data.expertises,
      expSelections: ['Select an expertise'],
    };
    this.createLists = this.createLists.bind(this);
    this.addExpertiseRow = this.addExpertiseRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDatePickRow = this.addDatePickRow.bind(this);
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
      dateRows: this.state.dateRows.concat([{fromDate: null, toDate: null}]),
      expertises: this.state.expertises,
      expSelections: this.state.expSelections,
    });
    this.forceUpdate();
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
      console.log(this.state.dateRows[i]);
      datePickRows.push(
        <DatePickRow
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
                <button onClick={this.addDatePickRow}>Add row</button>
              </div>
              <button>Submit</button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationForm;
