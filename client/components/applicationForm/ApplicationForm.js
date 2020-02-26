/* eslint-disable max-lines */
import React, {Component} from 'react';
import './ApplicationForm.css';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import DatePickerComponent from './datepicker/DatePickerComponent';
import ExpertiseComponent from './expertisepicker/ExpertiseComponent';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {letter: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.personalLetterChange = this.personalLetterChange.bind(this);
  }
  personalLetterChange(event) {
    let state = this.state;
    state['letter'] = event.target.value;
    this.setState(state);
  }
  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const formData = new FormData(event.target);
    formData.append('letter', this.state.letter);
    const data = formData.entries();
    let entry;
    const valueArray = [];
    while ((entry = data.next()).done === false) {
      valueArray.push(entry.value);
    }
  }

  render() {
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <h5>Personal information</h5>
              <div id="personalDetails">
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
                  type="text"
                  name={'ssn'}
                  className="form-control"
                  placeholder="Personal number"
                />
                <input
                  type="email"
                  name={'email'}
                  className="form-control"
                  placeholder="Email adress"
                />
              </div>
              <h5>Your expertise</h5>
              <div className="row w-100">
                <ExpertiseComponent />
              </div>
              <h5 className={'mt-2'}>Your availability</h5>
              <div id={'availabilityContainer'} className="w-100">
                <DatePickerComponent />
              </div>
              <h5>Personal Letter</h5>
              <div id={'availabilityContainer'} className="w-100">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    placeholder={'Enter some text here'}
                    value={this.state.letter}
                    onChange={this.personalLetterChange}
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
