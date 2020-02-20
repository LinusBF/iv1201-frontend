/*eslint-disable*/
import React, {Component} from 'react';
import './ApplicationForm.css';
import data from '../applications/fakeApplicationData';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {application: data.apps[0]};
  }
  createListOptions(){
    let options = [];
    this.state.application.expertise.forEach((key, i) => {
      options.push(<option key={i}>{key}</option>)
    });
    return options
  }
  renderExpertiseList(){
    return (
      <fieldset className={'w-100'}>
        <Form.Group>
          <Form.Label>Example select</Form.Label>
          <Form.Control as="select" id={'form-control'}>
            {this.createListOptions()}
            <option>1</option>
          </Form.Control>
        </Form.Group>
      </fieldset>
    );
  };

  render() {
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <Card.Body>
            <Form w-50>
              <h5>Personal information</h5>
              <fieldset disabled>
                <div className="row">
                  <div className="col">
                    <input type="text" id="disabledTextInput" className="form-control" placeholder="First name"/>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Last name"/>
                  </div>
                </div>
                <input type="email" className="form-control" placeholder="Email adress"/>
              </fieldset>
              <h5>Your expertise</h5>
              <div className="row">
                {this.renderExpertiseList()}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationForm;
