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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group style={{marginBottom: 0}} controlId="formBasicEmail">
            <Form.Control className={'input'} type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group style={{marginTop: 0}} controlId="formBasicPassword">
            <Form.Control className={'input'} type="password" placeholder="Enter your Password" />
          </Form.Group>
          <ButtonToolbar>
            <Button style={{width: '33%', marginTop: '10px'}} variant="dark" type="submit">
              Login
            </Button>
            <Button
              style={{
                width: '33%',
                marginTop: '10px',
                border: '1px solid grey',
                marginLeft: '15px',
              }}
              type="submit"
              variant={'light'}
            >
              Sign Up
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default Login;
