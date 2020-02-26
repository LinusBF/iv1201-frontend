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
// eslint-disable-next-line no-unused-vars
import {FormWithConstraints, FieldFeedbacks, FieldFeedback} from 'react-form-with-constraints';
import PersonalDetailsComponent from './PersonalDetailsComponent';

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
    this.handleChange(event);
  }
  handleChange(e) {
    this.form.validateFields(e.target);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.form.validateFields().then(r => {
      console.log(r);
      if (!this.form.isValid()) {
        console.log('form is invalid: do not submit');
        // eslint-disable-next-line no-undef
      } else {
        console.log('form is valid: submit');
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
    });
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
              <PersonalDetailsComponent changeHandler={this.handleChange} />
              <h5>Your expertise</h5>
              <div className="row w-100">
                <ExpertiseComponent changeHandler={this.handleChange} />
              </div>
              <h5 className={'mt-2'}>Your availability</h5>
              <div id={'availabilityContainer'} className="w-100">
                <DatePickerComponent changeHandler={this.handleChange} />
              </div>
              <h5>Personal Letter</h5>
              <div id={'letter'} className="w-100">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    placeholder={'Enter your personal letter here'}
                    value={this.state.letter}
                    onChange={this.personalLetterChange}
                    as="textarea"
                    name={'letter'}
                    rows="3"
                    required
                  />
                </Form.Group>
                <FieldFeedbacks for="letter">
                  <FieldFeedback when="valueMissing">
                    Personal letter is a mandatory field...
                  </FieldFeedback>
                  <FieldFeedback when={value => value.length > 200}>
                    Yeeeeez man, 200 chars maximum!
                  </FieldFeedback>
                </FieldFeedbacks>
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
