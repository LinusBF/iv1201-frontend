import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './singleApplication.css';
import PersonalDetailsViewComponent from './childComponents/PersonalDetailsViewComponent';
import ExpertiseViewComponent from './childComponents/ExpertiseViewComponent';
import AvailabilityViewComponent from './childComponents/AvailabilityViewComponent';
import LetterViewComponent from './childComponents/LetterViewComponent';
import ApprovalComponent from './childComponents/ApprovalComponent';
import MainMenu from '../menu/MainMenu';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    const {
      match: {params},
      location: {state},
    } = this.props;
    this.state = {
      uId: params.uId,
      noSubmission: false,
      firstName: '',
      lastName: '',
      ssn: '',
      email: '',
      letter: '',
      approved: null,
      expertise: [],
      available: [],
    };
    if (state) {
      this.state = {
        ...this.state,
        ...state,
      };
    }
  }

  componentDidMount() {
    if (this.state.email === '' && typeof this.props.idToken !== 'undefined') {
      axios
        .post(`/fetch-application${this.state.uId ? '/' + this.state.uId : ''}`, {
          token: this.props.idToken,
        })
        .then(res => {
          const application = res.data.application;
          this.setState({
            ...this.state,
            ...application,
          });
        })
        .catch(response => {
          if (response.status === 404) {
            this.setState({...this.state, noSubmission: true});
          }
        });
    }
  }

  render() {
    return (
      <div className='container-fluid'>
        <MainMenu />
        <div className='container'>
          <div className='row mt-5'>
            <div className='col-sm-8 p-0 pr-md-3 m-2 m-sm-0'>
              <div className='card p-5 mt-0'>
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
              </div>
            </div>
            <ApprovalComponent approved={this.state.approved} />
          </div>
        </div>
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
