/*eslint-disable*/
import React, {Component} from 'react';
import './singleApplication.css';
import clown from '../../Images/flat.svg';
import Card from 'react-bootstrap/Card';
import {Form} from 'react-bootstrap';

class SingleApplication extends Component {
  constructor(props) {
    super(props);
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
