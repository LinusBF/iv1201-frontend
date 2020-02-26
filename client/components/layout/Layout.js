import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import Applications from '../applications/Applications';
import SingleApplication from '../singleApplication/singleApplication';
import ApplicationForm from '../applicationForm/ApplicationForm';
import ExpertiseComponent from '../applicationForm/expertisepicker/ExpertiseComponent';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'layoutBody'}>
        <Switch>
          <Route path="/Register" render={() => <Register />} />
          <Route path="/Applications" render={() => <Applications />} />
          <Route path="/SingleApplication" render={() => <SingleApplication />} />
          <Route path="/ApplicationForm" render={() => <ApplicationForm />} />
          <Route path="/expertise" render={() => <ExpertiseComponent />} />
          <Route path="/" render={() => <Login />} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
