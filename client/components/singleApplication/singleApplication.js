/*eslint-disable*/
import React, {Component} from 'react';
import './Application.css';
import clown from '../../Images/flat.svg';
import Card from 'react-bootstrap/Card';
import {Form} from 'react-bootstrap';

class SingleApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={'container-fluid'}>
        <div className={'logo'}>
          <div className={'clownIcon'}>
            <img src={clown} alt={'...'} />
          </div>
          <div className={'logoright'}>
            <div className={'logoHeader1'}>HireTheseClowns</div>
            <div className={'logoHeader2'}>Recruitment Service</div>
          </div>
        </div>
        <div className={'container justify-content-md-center'}>
          <div className="row"><h2>Kalle Klaesson</h2></div>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Card>
                <Card.Body>
                  <Form>
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
                        <fieldset disabled>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Example select</Form.Label>
                          <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                        </fieldset>
                      </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-12 col-md-6">
              <Card>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the
                    cards content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleApplication;
