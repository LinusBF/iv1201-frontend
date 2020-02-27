import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './singleApplication.css';
import FormWrapper from './childComponents/FormWrapper';
import PersonalDetailsViewComponent from './childComponents/PersonalDetailsViewComponent';
import ExpertiseViewComponent from './childComponents/ExpertiseViewComponent';
import AvailabilityViewComponent from './childComponents/AvailabilityViewComponent';
import LetterViewComponent from './childComponents/LetterViewComponent';
import ApprovalComponent from './childComponents/ApprovalComponent';
import MainMenu from '../menu/MainMenu';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import baseState from './baseState';

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    const {
      match: {params},
      location: {applicationState},
    } = this.props;
    this.state = baseState;
    this.state.uId = params.uId;
    if (applicationState) {
      this.state = {
        ...this.state,
        ...applicationState,
      };
    }
  }

  componentDidMount() {
    if (this.state.email === '' && typeof this.props.idToken !== 'undefined') {
      const that = this;
      axios
        .post(`/fetch-application${this.state.uId ? '/' + this.state.uId : ''}`, {
          token: this.props.idToken,
        })
        .then(res => {
          const application = res.data.application;
          that.setState({
            ...that.state,
            ...application,
          });
        })
        .catch(error => {
          if (error.response.status === 404) {
            that.setState({...that.state, noSubmission: true});
          }
        });
    }
  }

  render() {
    const sidebar = (
      <ApprovalComponent
        approved={this.state.approved}
        applicationId={this.state.uId}
        idToken={this.props.idToken}
      />
    );
    return (
      <div className='container-fluid'>
        <MainMenu />
        <FormWrapper sidebar={sidebar}>
          <Link to={'/Applications'}>Go Back to list</Link>
          <h5>Personal information</h5>
          <PersonalDetailsViewComponent
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            ssn={this.state.ssn}
            email={this.state.email}
          />
          <h5>Expertise</h5>
          <ExpertiseViewComponent expertise={this.state.expertise} />
          <h5>Availability</h5>
          <AvailabilityViewComponent available={this.state.available} />
          <h5>Personal letter</h5>
          <LetterViewComponent letter={this.state.letter} />
        </FormWrapper>
        {typeof this.props.idToken === 'undefined' ? <Redirect to='/' /> : <div />}
        {this.state.noSubmission === true ? <Redirect to='/ApplicationForm' /> : <div />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {idToken: state.login.idToken};
}

export default connect(mapStateToProps, {login})(SingleApplication);
