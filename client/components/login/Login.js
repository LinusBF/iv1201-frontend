import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {Form, Button, ButtonToolbar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {login} from '../../redux/actions';
import './Login.css';
import Logo from '../menu/Logo';
import {loginFormSchema} from '../../yupSchemas/loginSchema';

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
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(idToken) {
            // eslint-disable-next-line react/prop-types
            that.props.login(idToken);
            // ...
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
                    Login
                  </Button>
                  <Button href={'/Register'} id={'signUpButton'} variant={'light'}>
                    Sign Up
                  </Button>
                </ButtonToolbar>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default connect(null, {login})(Login);
