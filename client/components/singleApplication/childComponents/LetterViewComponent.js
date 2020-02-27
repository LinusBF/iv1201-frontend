import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

class LetterViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          disabled
          value={this.props.data}
          as="textarea"
          name={'letter'}
          rows="3"
          required
        />
      </Form.Group>
    );
  }
}

export default LetterViewComponent;
