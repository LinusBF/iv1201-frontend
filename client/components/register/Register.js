import React, {Component} from 'react';
import firebase from '../../firebaseConfig';
import {Form, Button, ButtonToolbar} from 'react-bootstrap';
import '../login/Login.css';
import clown from '../../Images/flat.svg';

class Register extends Component {
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
        console.info(r);
      })
      .catch(e => {
        console.error('login not succesful', e);
      });
  }

  render() {
    return (
      <div>
        <div className={'logo'}>
          <div className={'clownIcon'}>
            <img src={clown} alt={'...'} />
          </div>
          <div className={'logoright'}>
            <div>asdfasf</div>
            <div>asdfasddf</div>
          </div>
        </div>
        <div className={'loginForm'}>
          <div id={'headline1'}>You are here to</div>
          <div id={'headline2'}>Make people laugh</div>
          <div id={'headline3'}>Welcome back! Please log in to your account</div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group style={{marginBottom: 0}} controlId="formBasicEmail">
              <Form.Control id={'inputMail'} type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group style={{marginTop: 0}} controlId="formBasicPassword">
              <Form.Control id={'inputPass'} type="password" placeholder="Enter your Password" />
            </Form.Group>
            <ButtonToolbar>
              <Button id={'loginButton'} type="submit" variant={'dark'}>
                Sign Up
              </Button>
              <Button href={'/'} id={'signUpButton'} type="submit" variant={'light'}>
                Login instead
              </Button>
            </ButtonToolbar>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;