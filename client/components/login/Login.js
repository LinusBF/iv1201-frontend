import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {connect} from 'react-redux';
import {login, setLoginStatus} from '../../redux/actions';
import './Login.css';
import Logo from '../logo/Logo';
import axios from 'axios';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const that = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(e.email, e.password)
      .then(r => {
        console.log(r.user.uid);
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
            // eslint-disable-next-line react/prop-types
            that.props.login(idToken);
            axios
              .post('/user-status', {token: idToken})
              .then(res => {
                console.info(res);
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(e => {
        console.error('login not succesful', e);
      });
  }

  render() {
    return (
      <div>
        <Logo />
        <LoginForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
export default connect(null, {login, setLoginStatus})(Login);
