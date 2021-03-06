import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import '../login/Login.css';
import {Redirect} from 'react-router-dom';
import MainMenu from '../menu/MainMenu';
import RegisterForm from './RegisterForm';

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
      .then(r => {
        const userid = r.user.uid;
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function(idT) {
            that.props.login({idToken: idT, uid: userid});
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
      <div className={'container-fluid'}>
        <MainMenu></MainMenu>
        <div id={'formcontainer'} className='row mt-3 pt-5'>
          <RegisterForm handleSubmit={this.handleSubmit} />
          {this.props.loggedIn === true ? <Redirect to='/ApplicationForm' /> : <div></div>}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {loggedIn: state.login.loggedIn};
}
export default connect(mapStateToProps, {login})(Register);
