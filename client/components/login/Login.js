import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../../firebaseConfig';
import {connect} from 'react-redux';
import {login, setLoginStatus} from '../../redux/actions';
import './Login.css';
import axios from 'axios';
import LoginForm from './LoginForm';
import MainMenu from '../menu/MainMenu';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isAdmin: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const that = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(e.email, e.password)
      .then(r => {
        const userid = r.user.uid;
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(idT) {
            // eslint-disable-next-line react/prop-types
            that.props.login({idToken: idT, uid: userid});
            console.log(idT);
            axios
              .post('/user-status', {token: idT})
              .then(res => {
                that.setState({
                  ...that.state,
                  loggedIn: true,
                  isAdmin: res.data === 'admin',
                });
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
      <div className={'container-fluid'}>
        <MainMenu />
        <LoginForm handleSubmit={this.handleSubmit} />
        {this.state.loggedIn === true ? (
          this.state.isAdmin === true ? (
            <Redirect to='/applications' />
          ) : (
            <Redirect to='/applicationForm' />
          )
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default connect(null, {login, setLoginStatus})(Login);
