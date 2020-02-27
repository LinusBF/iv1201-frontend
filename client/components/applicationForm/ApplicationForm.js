/* eslint-disable max-lines */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import FormatSubmission from './formatSubmission';
import {FormWithConstraints} from 'react-form-with-constraints';
import ExpertiseComponent from './childComponents/expertisepicker/ExpertiseComponent';
import DatePickerComponent from './childComponents/datepicker/DatePickerComponent';
import PersonalDetailsComponent from './childComponents/PersonalDetailsComponent';
import LetterComponent from './childComponents/LetterComponent';
import MainMenu from '../menu/MainMenu';
import './ApplicationForm.css';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {letter: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.extractApplication = this.extractApplication.bind(this);
    this.updateLetter = this.updateLetter.bind(this);
    this.token =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTNmN2EwMjQ4YmU0ZTBkZjAyYWVlZWIyMGIxZDJlMmI3ZjI0NzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2xvYmFsLWFwcGxpY2F0aW9uLWV4YW1wbGUiLCJhdWQiOiJnbG9iYWwtYXBwbGljYXRpb24tZXhhbXBsZSIsImF1dGhfdGltZSI6MTU4MjgyNDA5NiwidXNlcl9pZCI6Im43RENKUG5UdDhnYXJWeXdyTEhjeHBxT2pjSDIiLCJzdWIiOiJuN0RDSlBuVHQ4Z2FyVnl3ckxIY3hwcU9qY0gyIiwiaWF0IjoxNTgyODI0MDk3LCJleHAiOjE1ODI4Mjc2OTcsImVtYWlsIjoibWVsa2VyLm1vc3NiZXJnQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtZWxrZXIubW9zc2JlcmdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.OMxZPS_XI0kulEqJDC6nrlXDjKzT7MblrYmo_PEvGYiH6Zb9u2hFd1JUcZN_Z8e2bu1QVv9cu4yaSdJFWx5I_iw8zz9R8Smi1mDCEdjx4q5tKwBvzm0xe0CuS6nh8WyZEyBO0b85m0_bNuegbNn2JlfJrrKnmLid-NneBar8oNvSWS4F_6WKdyK9I7qzRy4zIOKZuFY61ZzEcOLB7Ej5IgF66OvQd0NZKSym23GNEZk6Mnby94eoH8d5DI-r6NQdgA7jgNVIy60TlsY6BEeCSBHRzTBvXneC4KsqfT4Q-v0EXQaWBbUE_b0i462paghOFttNKHxEBkSPXMN4S1hieQ';
  }
  handleChange(e) {
    this.form.validateFields(e.target);
  }
  handleSubmit(event) {
    event.preventDefault();
    const formattedApplication = this.extractApplication(event);
    console.log(formattedApplication);
    this.form.validateFields().then(r => {
      if (this.form.isValid()) {
        console.log('Field is valid: submit');
        axios
          .post('/submit', {token: this.token, application: formattedApplication})
          .then(ans => {
            console.log(ans);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log(`Field invalid... ${r}`);
      }
    });
  }
  extractApplication(event) {
    // eslint-disable-next-line no-undef
    const formData = new FormData(event.target);
    formData.append('letter', this.state.letter);
    const data = formData.entries();
    let entry;
    const valueArray = [];
    while ((entry = data.next()).done === false) {
      valueArray.push(entry.value);
    }
    return FormatSubmission(valueArray);
  }
  updateLetter(text) {
    this.setState({letter: text});
  }
  render() {
    return (
      <div className='container-fluid'>
        <MainMenu />
        <div className={'container justify-content-md-center mt-3 pt-1'}>
          <Card className={'col-7'}>
            <Card.Body>
              <FormWithConstraints
                onSubmit={this.handleSubmit}
                ref={form => (this.form = form)}
                noValidate>
                <h5>Personal information</h5>
                <PersonalDetailsComponent changeHandler={this.handleChange} />
                <h5>Your expertise</h5>
                <ExpertiseComponent changeHandler={this.handleChange} />
                <h5 className={'mt-2'}>Your availability</h5>
                <div id={'availabilityContainer'} className='w-100'>
                  <DatePickerComponent changeHandler={this.handleChange} />
                </div>
                <h5>Personal Letter</h5>
                <LetterComponent
                  changeHandler={this.handleChange}
                  changeLetter={this.updateLetter}
                />
                <Button type={'submit'} variant={'primary'} size={'md'} className={'mt-2'} block>
                  Submit application
                </Button>
              </FormWithConstraints>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {uid: state.login.uid};
}
export default connect(mapStateToProps, {login})(ApplicationForm);
