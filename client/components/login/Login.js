import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {Form, Button, ButtonToolbar} from 'react-bootstrap';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(e.target[0].value, e.target[1].value)
      .then(r => {
        console.error(r);
      })
      .catch(e => {
        console.error('login not succesful', e);
      });
  }

  render() {
    return (
      <div className={'loginForm'}>
        <div id={'headlines'}>
          You are here to
          <br />
          Make people laugh
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group style={{marginBottom: 0}} controlId="formBasicEmail">
            <Form.Control id={'inputMail'} type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group style={{marginTop: 0}} controlId="formBasicPassword">
            <Form.Control id={'inputPass'} type="password" placeholder="Enter your Password" />
          </Form.Group>
          <ButtonToolbar>
            <Button id={'loginButton'} type="submit" variant={'dark'}>
              Login
            </Button>
            <Button id={'signUpButton'} type="submit" variant={'light'}>
              Sign Up
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default Login;
