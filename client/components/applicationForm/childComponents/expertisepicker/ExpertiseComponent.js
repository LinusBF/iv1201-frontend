import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import ExpertiseRow from './ExpertiseRow';

class ExpertiseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        'Work as cashier',
        'Work in citchen',
        'Serve food',
        'Being a clown',
        'Scaring children',
        'Fixing broken stuff',
        'Cleaning toilets',
        'Taking group photos',
      ],
      numRows: 0,
    };
    this.renderAllLists = this.renderAllLists.bind(this);
    this.addList = this.addList.bind(this);
  }
  addList() {
    const state = this.state;
    state['numRows']++;
    this.setState(state);
  }
  renderAllLists() {
    const arr = [];
    for (let i = 0; i < this.state.numRows; i++) {
      arr.push(
        <ExpertiseRow
          key={`exp-${i}`}
          index={i}
          options={this.state.options}
          changeHandler={this.props.changeHandler}
        />
      );
    }
    return arr;
  }
  render() {
    const allLists = this.renderAllLists();
    return (
      <div id={'expertises'} className={'row w-100'}>
        <Form.Group className={'w-100'}>{allLists}</Form.Group>
        <Button onClick={this.addList} className={'mt-0 mb-4'} variant='primary' size='md' block>
          Add expertise
        </Button>
      </div>
    );
  }
}

export default ExpertiseComponent;
