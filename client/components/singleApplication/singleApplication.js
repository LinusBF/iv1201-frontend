import React, {Component} from 'react';
import './singleApplication.css';
import Logo from '../logo/Logo';
import {
  firstName,
  lastName,
  ssn,
  email,
  expertise,
  available,
  letter,
  approved,
} from './singeFakeObjekt';
import PersonalDetailsViewComponent from './childComponents/PersonalDetailsViewComponent';
import ExpertiseViewComponent from './childComponents/ExpertiseViewComponent';
import AvailabilityViewComponent from './childComponents/AvailabilityViewComponent';
import LetterViewComponent from './childComponents/LetterViewComponent';
import ApprovalComponent from './childComponents/ApprovalComponent';

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    this.personalData = {firstName, lastName, ssn, email};
  }

  render() {
    console.log(firstName);
    return (
      <div className="container-flui">
        <Logo />
        <div className="container">
          <div className="row mt-5">
            <div className="col-sm-8 p-0 pr-md-3 m-2 m-sm-0">
              <div className="card p-5 mt-0">
                <h5>Personal information</h5>
                <PersonalDetailsViewComponent data={this.personalData} />
                <h5>Expertise</h5>
                <ExpertiseViewComponent data={expertise} />
                <h5>Availability</h5>
                <AvailabilityViewComponent data={available} />
                <h5>Personal letter</h5>
                <LetterViewComponent data={letter} />
              </div>
            </div>
            <ApprovalComponent data={approved} />
          </div>
        </div>
      </div>
    );
  }
}

export default SingleApplication;
