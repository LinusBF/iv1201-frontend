/* eslint-disable max-lines */
import React, {Component} from 'react';
import './ApplicationForm.css';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import DatePickerComponent from './datepicker/DatePickerComponent';
import ExpertiseComponent from './expertisepicker/ExpertiseComponent';
import FormatSubmission from './formatSubmission';
import {FormWithConstraints, FieldFeedbacks, FieldFeedback} from 'react-form-with-constraints';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {letter: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.personalLetterChange = this.personalLetterChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  personalLetterChange(event) {
    let state = this.state;
    state['letter'] = event.target.value;
    this.setState(state);
  }
  handleChange(e) {
    this.form.validateFields(e.target);
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
    console.log(FormatSubmission(valueArray));
  }

  render() {
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <Card.Body>
            <FormWithConstraints
              onSubmit={this.handleSubmit}
              ref={form => (this.form = form)}
              noValidate
            >
              <h5>Personal information</h5>
              <div id="personalDetails">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name={'firstName'}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="First name"
                      required
                    />
                    <FieldFeedbacks for="firstName">
                      <FieldFeedback when={value => !/^$|^[a-zA-Z]+$/.test(value)}>
                        Only letters...
                      </FieldFeedback>
                      <FieldFeedback when={value => value.length < 3}>Too short...</FieldFeedback>
                    </FieldFeedbacks>
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name={'lastName'}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Last name"
                      required
                    />
                    <FieldFeedbacks for="lastName">
                      <FieldFeedback when={value => !/^$|^[a-zA-Z]+$/.test(value)}>
                        Only letters...
                      </FieldFeedback>
                      <FieldFeedback when={value => value.length < 3}>Too short...</FieldFeedback>
                    </FieldFeedbacks>
                  </div>
                </div>
                <input
                  type="text"
                  name={'ssn'}
                  autoComplete={'off'}
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Personal number"
                  required
                />
                <FieldFeedbacks for="ssn">
                  <FieldFeedback when={value => value.length === 0}>Mandatory field!</FieldFeedback>
                  <FieldFeedback when={value => value.length !== 12}>YYYYMMDDXXX</FieldFeedback>
                  <FieldFeedback when={value => !/^(19|20)?[0-9]{6}[- ]?[0-9]{4}$/.test(value)}>
                    YYYYMMDDXXX
                  </FieldFeedback>
                </FieldFeedbacks>
                <input
                  type="email"
                  name={'email'}
                  className="form-control"
                  placeholder="Email adress"
                  onChange={this.handleChange}
                  required
                />
                <FieldFeedbacks for="email">
                  <FieldFeedback when={value => value.length === 0}>Mandatory field!</FieldFeedback>
                  <FieldFeedback when={value => !/\S+@\S+/.test(value)}>
                    Invalid email
                  </FieldFeedback>
                </FieldFeedbacks>
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
            </FormWithConstraints>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationForm;
