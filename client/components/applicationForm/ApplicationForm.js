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
import {Redirect} from 'react-router';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {letter: '', submitted: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.extractApplication = this.extractApplication.bind(this);
    this.updateLetter = this.updateLetter.bind(this);
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
          .post('/submit', {token: this.props.idToken, application: formattedApplication})
          .then(ans => {
            console.log(ans);
            this.setState({
              ...this.state,
              submitted: true,
            });
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
        {typeof this.props.idToken === 'undefined' ? <Redirect to='/' /> : <div />}
        {this.state.submitted === true ? <Redirect to='/SingleApplication' /> : <div />}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {uid: state.login.uid, idToken: state.login.idToken};
}
export default connect(mapStateToProps, {login})(ApplicationForm);
