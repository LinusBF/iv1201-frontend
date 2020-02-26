import React, {Component} from 'react';
import {FieldFeedback, FieldFeedbacks, FormWithConstraints} from 'react-form-with-constraints';

class PersonalDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.form.validateFields(e.target);
  }
  render() {
    return (
      <FormWithConstraints onSubmit={this.handleSubmit} ref={form => (this.form = form)} noValidate>
        <div id="personalDetails">
          <div className="row">
            <div className="col">
              <input
                type="text"
                name={'firstName'}
                onChange={this.handleChange}
                className="form-control"
                placeholder="First name"
                required
              />
              <FieldFeedbacks for="firstName">
                <FieldFeedback when={value => !/^$|^[a-zA-Z]+$/.test(value)}>
                  Only letters...
                </FieldFeedback>
                <FieldFeedback when={value => value.length < 3}>Too short...</FieldFeedback>
              </FieldFeedbacks>
            </div>
            <div className="col">
              <input
                type="text"
                name={'lastName'}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Last name"
                required
              />
              <FieldFeedbacks for="lastName">
                <FieldFeedback when={value => !/^$|^[a-zA-Z]+$/.test(value)}>
                  Only letters...
                </FieldFeedback>
                <FieldFeedback when={value => value.length < 3}>Too short...</FieldFeedback>
              </FieldFeedbacks>
            </div>
          </div>
          <input
            type="text"
            name={'ssn'}
            autoComplete={'off'}
            className="form-control"
            onChange={this.handleChange}
            placeholder="Personal number"
            required
          />
          <FieldFeedbacks for="ssn">
            <FieldFeedback when={value => value.length === 0}>Mandatory field!</FieldFeedback>
            <FieldFeedback when={value => value.length !== 12}>YYYYMMDDXXX</FieldFeedback>
            <FieldFeedback when={value => !/^(19|20)?[0-9]{6}[- ]?[0-9]{4}$/.test(value)}>
              YYYYMMDDXXX
            </FieldFeedback>
          </FieldFeedbacks>
          <input
            type="email"
            name={'email'}
            className="form-control"
            placeholder="Email adress"
            onChange={this.handleChange}
            required
          />
          <FieldFeedbacks for="email">
            <FieldFeedback when={value => value.length === 0}>Mandatory field!</FieldFeedback>
            <FieldFeedback when={value => !/\S+@\S+/.test(value)}>Invalid email</FieldFeedback>
          </FieldFeedbacks>
        </div>
      </FormWithConstraints>
    );
  }
}

export default PersonalDetailsComponent;
