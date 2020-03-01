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
            const idTok = idT;
            // eslint-disable-next-line react/prop-types
            console.log(idT);
            axios
              .post('/user-status', {token: idTok})
              .then(res => {
                that.props.login({idToken: idT, uid: userid, userStatus: res.data});
                console.log(res.data);
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
        {this.props.loggedIn === true ? (
          this.props.userStatus === 'admin' ? (
            <Redirect to='/Applications' />
          ) : (
            <Redirect to='/SingleApplication' />
          )
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {loggedIn: state.login.loggedIn, userStatus: state.login.userStatus};
}

export default connect(mapStateToProps, {login, setLoginStatus})(Login);
