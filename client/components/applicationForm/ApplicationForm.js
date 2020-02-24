/*eslint-disable*/
import React, {Component, createElement} from 'react';
import './ApplicationForm.css';
import data from './fakeSingleApplicationData';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {forEach} from 'react-bootstrap/cjs/ElementChildren';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expertises: data.expertises,
      expSelections: ['Select an expertise']
    };
    this.createListOptions = this.createListOptions.bind(this);
    this.createLists = this.createLists.bind(this);
    this.addExpertiseRow = this.addExpertiseRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addExpertiseRow(key, index){
    if (index === this.state.expSelections.length-1){
      const newArray = this.state.expSelections.concat(['new item']);
      this.setState({
        expertises: this.state.expertises,
        expSelections: newArray
      });
      this.forceUpdate();
      console.log(this.state.expSelections);
    };
  }

  createListOptions(){
    let options = [<option key={0}>Select an expertise</option>];
    this.state.expertises.forEach((key, i) => {
      options.push(<option key={i+1}>{key}</option>)
    });
    return options;
  }
  createLists(array){
    const lists = [];
    array.forEach((key, index) => {
      lists.push(<Form.Control name={'expertise'} onChange={()=>{this.addExpertiseRow(key, index)}} as="select">
        {this.createListOptions()}
      </Form.Control>)
    });
    return lists;
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target).entries();
    let printVal;
    while ((printVal = data.next()).done === false){
      console.log(printVal);
    };
  }

  render() {
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <h5>Personal information</h5>
                <div className="row">
                  <div className="col">
                    <input type="text" name={'firstName'} className="form-control" placeholder="First name"/>
                  </div>
                  <div className="col">
                    <input type="text" name={'lastName'} className="form-control" placeholder="Last name"/>
                  </div>
                </div>
                <input type="email" name={'email'} className="form-control" placeholder="Email adress"/>
                <h5>Your expertise</h5>
                <div className="row w-100">
                  <Form.Group id={'optionsContainer'} className={'w-100'}>
                    <Form.Label>Example select</Form.Label>
                    {this.createLists(this.state.expSelections)}
                  </Form.Group>
                </div>
              <button type={'submit'}>Submit</button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationForm;
