import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Icon from '../../Icons';
import {Form} from 'react-bootstrap';

class ExpertiseRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: true,
      selected: 'Select an expertise',
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }
  handleChange(newSelection) {
    const state = this.state;
    state['selected'] = newSelection;
    this.setState(state);
  }
  deleteList() {
    const state = this.state;
    state['shouldRender'] = false;
    this.setState(state);
  }
  render() {
    const options = [];
    this.props.options.forEach((val, i) => {
      options.push(
        <option key={`opt-${i}`} onChange={this.handleChange}>
          {val}
        </option>
      );
    });
    if (!this.state.shouldRender) return null;
    return (
      <div className={'w-100 row mt-2'}>
        <Form.Control className="col" name={'expertise'} as="select">
          {options}
        </Form.Control>
        <div className="col-2-sm">
          <Button variant={'outline-danger'} onClick={this.deleteList}>
            <Icon icon={'bin2'} />
          </Button>
        </div>
      </div>
    );
  }
}
export default ExpertiseRow;
