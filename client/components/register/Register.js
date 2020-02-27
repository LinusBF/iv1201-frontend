import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import '../login/Login.css';
import Logo from '../menu/Logo';
import {Redirect} from 'react-router-dom';
import LoginForm from '../login/LoginForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    const that = this;
    firebase
      .auth()
      .createUserWithEmailAndPassword(e.email, e.password)
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
            that.props.login(idToken);
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(e => {
        console.error('sign up not successful', e);
      });
  }
  render() {
    return (
      <div>
        <Logo />
        <LoginForm handleSubmit={this.handleSubmit} />
        {this.props.loggedIn === true ? <Redirect to="/ApplicationForm" /> : <div></div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {loggedIn: state.login.loggedIn};
}
export default connect(mapStateToProps, {login})(Register);
