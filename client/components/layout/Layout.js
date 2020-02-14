import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../login/Login';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'layoutBody'}>
        <Switch>
          <Route path="/" render={() => <Login />} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
