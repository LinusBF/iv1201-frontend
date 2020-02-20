import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import Applications from '../applications/Applications';
import SingleApplication from '../singleApplication/singleApplication';
import ApplicationForm from '../applicationForm/ApplicationForm';

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
          <Route path="/" render={() => <Login />} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
