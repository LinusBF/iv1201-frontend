import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {Form, Button, ButtonToolbar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import '../login/Login.css';
import Logo from '../logo/Logo';
import {Formik} from 'formik';
import {loginFormSchema} from '../../yupSchemas/loginSchema';
import {Redirect} from 'react-router-dom';
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
        <div className={'loginForm'}>
          <div id={'headline1'}>You are here to</div>
          <div id={'headline2'}>Make people laugh</div>
          <div id={'headline3'}>Welcome back! Please log in to your account</div>
          <Formik
            validationSchema={loginFormSchema}
            onSubmit={this.handleSubmit}
            initialValues={{email: '', password: ''}}
          >
            {/* eslint-disable-next-line no-unused-vars */}
            {({handleSubmit, handleChange, handleBlur, values, touched, isInvalid, errors}) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group style={{marginBottom: 0}} controlId="formBasicEmail">
                  <Form.Control
                    className={'inputMail'}
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group style={{marginTop: 0}} controlId="formBasicPassword">
                  <Form.Control
                    className={'inputPass'}
                    type="password"
                    placeholder="Enter your Password"
                    name="password"
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <ButtonToolbar>
                  <Button id={'loginButton'} type="submit" variant={'dark'}>
                    Sign Up
                  </Button>
                  <Button href={'/Login'} id={'signUpButton'} variant={'light'}>
                    Login instead
                  </Button>
                </ButtonToolbar>
              </Form>
            )}
          </Formik>
        </div>
        {console.log(this.props.loggedIn)}
        {this.props.loggedIn === true ? <Redirect to="/ApplicationForm" /> : <div></div>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {loggedIn: state.login.loggedIn};
}
export default connect(mapStateToProps, {login})(Register);
