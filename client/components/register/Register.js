import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {Form, Button} from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(e.target[0].value, e.target[1].value)
      .then(r => {
        console.error(r);
      })
      .catch(e => {
        console.error('sign up not succesful', e);
      });
  }

  render() {
    return (
      <div className={'loginForm'}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
