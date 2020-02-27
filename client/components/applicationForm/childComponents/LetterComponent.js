import React, {Component} from 'react';
import {FieldFeedback, FieldFeedbacks} from 'react-form-with-constraints';
import {Form} from 'react-bootstrap';

class LetterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {letter: ''};
    this.personalLetterChange = this.personalLetterChange.bind(this);
  }
  personalLetterChange(event) {
    this.props.changeHandler(event);
    let state = this.state;
    state['letter'] = event.target.value;
    this.setState(state);
  }
  render() {
    return (
      <div id={'letter'} className="w-100">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            placeholder={'Enter your personal letter here'}
            value={this.state.letter}
            onChange={this.personalLetterChange}
            as="textarea"
            name={'letter'}
            rows="3"
            required
          />
        </Form.Group>
        <FieldFeedbacks for="letter">
          <FieldFeedback when="valueMissing">Personal letter is a mandatory field...</FieldFeedback>
          <FieldFeedback when={value => value.length > 200}>
            Yeeeeez man, 200 chars maximum!
          </FieldFeedback>
        </FieldFeedbacks>
      </div>
    );
  }
}

export default LetterComponent;
