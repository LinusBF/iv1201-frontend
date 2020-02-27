import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './singleApplication.css';
import PersonalDetailsViewComponent from './childComponents/PersonalDetailsViewComponent';
import ExpertiseViewComponent from './childComponents/ExpertiseViewComponent';
import AvailabilityViewComponent from './childComponents/AvailabilityViewComponent';
import LetterViewComponent from './childComponents/LetterViewComponent';
import ApprovalComponent from './childComponents/ApprovalComponent';
import MainMenu from '../menu/MainMenu';

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    const {
      match: {params},
      location: {state},
    } = this.props;
    if (state) {
      this.state = {
        ...state,
      };
    } else {
      this.state = {
        firstName: '',
        lastName: '',
        ssn: '',
        email: '',
        letter: '',
        approved: null,
        expertise: [],
        available: [],
      };
    }
    this.state.uId = params.uId;
  }

  componentDidMount() {
    if (this.state.email === '') {
      axios.get(`/fetch-application/${this.state.uId ? this.state.uId : ''}`).then(res => {
        console.log(res.data);
        const application = res.data.application;
        this.setState({
          ...this.state,
          firstName: application.firstName,
          lastName: application.lastName,
          ssn: application.ssn,
          email: application.email,
          letter: application.letter,
          approved: application.approved,
          expertise: application.expertise,
          available: application.available,
        });
      });
    }
  }

  render() {
    console.log(this.state.firstName);
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
      </div>
    );
  }
}

export default SingleApplication;
