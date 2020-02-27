import React, {Component} from 'react';
import {Formik} from 'formik';
import {loginFormSchema} from '../../yupSchemas/loginSchema';
import {Button, ButtonToolbar, Form} from 'react-bootstrap';
import './Login.css';

class LoginForm extends Component {
  render() {
    return (
      <div id={'formContainer'} className={'container mt-3 pt-5'}>
        <div className='col-5' style={{marginLeft: 'auto', marginRight: 'auto'}}>
          <div id={'headline1'}>You are here to</div>
          <div id={'headline2'}>Make people laugh</div>
          <div id={'headline3'}>Welcome back! Please log in to your account</div>
          <Formik
            validationSchema={loginFormSchema}
            onSubmit={this.props.handleSubmit}
            initialValues={{email: '', password: ''}}>
            {/* eslint-disable-next-line no-unused-vars */}
            {({handleSubmit, handleChange, handleBlur, values, touched, isInvalid, errors}) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group style={{marginBottom: 0}} controlId='formBasicEmail'>
                  <Form.Control
                    className={'inputMail'}
                    type='email'
                    placeholder='Enter your email'
                    name='email'
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group style={{marginTop: 0}} controlId='formBasicPassword'>
                  <Form.Control
                    className={'inputPass'}
                    type='password'
                    placeholder='Enter your Password'
                    name='password'
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <ButtonToolbar>
                  <Button id={'loginButton'} type='submit' variant={'dark'}>
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

export default LoginForm;
