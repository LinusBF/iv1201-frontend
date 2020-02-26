/* eslint-disable max-lines */
import React, {Component} from 'react';
import './ApplicationForm.css';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import DatePickerComponent from './datepicker/DatePickerComponent';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRows: [{fromDate: null, toDate: null}],
      expSelections: ['Select an expertise'],
      letter: 'Please write about yourself here.',
    };
    this.createLists = this.createLists.bind(this);
    this.addExpertiseRow = this.addExpertiseRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.letterChange = this.letterChange.bind(this);
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
                <DatePickerComponent />
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
