import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import Applications from '../applications/Applications.jsx';
import SingleApplication from '../singleApplication/singleApplication';
import ApplicationForm from '../applicationForm/ApplicationForm';
import ExpertiseComponent from '../applicationForm/childComponents/expertisepicker/ExpertiseComponent';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'layoutBody'}>
        <Switch>
          <Route path='/Register' render={() => <Register />} />
          <Route path='/Applications' render={() => <Applications />} />
          <Route path='/SingleApplication/:uId' component={SingleApplication} />
          <Route path='/SingleApplication' component={SingleApplication} />
          <Route path='/ApplicationForm' render={() => <ApplicationForm />} />
          <Route path='/expertise' render={() => <ExpertiseComponent />} />
          <Route path='/' render={() => <Login />} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
