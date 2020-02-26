/* eslint-disable max-lines */
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ExpertiseRow from './ExpertiseRow';

class ExpertiseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['test', 'lorem', 'ipsum', 'dolor', 'sit', 'amet'],
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
      arr.push(<ExpertiseRow key={`exp-${i}`} options={this.state.options} />);
    }
    return arr;
  }
  render() {
    const allLists = [];
    allLists.push(this.renderAllLists());
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <h5>TEST</h5>
          <Form.Group>{allLists}</Form.Group>
          <Button onClick={this.addList} className={'mt-2'} variant="primary" size="md" block>
            Add expertise
          </Button>
        </Card>
      </div>
    );
  }
}

export default ExpertiseComponent;
