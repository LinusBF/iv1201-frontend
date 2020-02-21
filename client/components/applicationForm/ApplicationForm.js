/*eslint-disable*/
import React, {Component, createElement} from 'react';
import './ApplicationForm.css';
import data from './fakeSingleApplicationData';
import {Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expertises: data.expertises,
      expSelections: ['Select an expertise']
    };
    this.createListOptions = this.createListOptions.bind(this);
    this.createLists = this.createLists.bind(this);
    this.renderExpertiseList = this.renderExpertiseList.bind(this);
    this.addExpertiseRow = this.addExpertiseRow.bind(this);
  }

  addExpertiseRow(key, index){
    if (index === this.state.expSelections.length-1){
      const oldArray = this.state.expSelections;
      const newArray = oldArray.concat(['new item']);
      this.setState({
        expertises: this.state.expertises,
        expSelections: newArray
      });
      this.forceUpdate();
      console.log(this.state.expSelections);
    };
  }

  createListOptions(){
    let options = [<option>Select an expertise</option>];
    this.state.expertises.forEach((key, i) => {
      options.push(<option key={i}>{key}</option>)
    });
    return options;
  }
  createLists(array){
    const lists = [];
    array.forEach((key, index) => {
      lists.push(<Form.Control onChange={()=>{this.addExpertiseRow(key, index)}} as="select">
        {this.createListOptions()}
      </Form.Control>)
    });
    return lists;
  }
  renderExpertiseList(){
    return (
      <div className="row">
        <fieldset className={'w-100'}>
          <Form.Group id={'optionsContainer'}>
            <Form.Label>Example select</Form.Label>
            {this.createLists(this.state.expSelections)}
          </Form.Group>
        </fieldset>
      </div>
    );
  };

  render() {
    return (
      <div className={'container justify-content-md-center'}>
        <Card className={'col-7'}>
          <Card.Body>
            <Form>
              <h5>Personal information</h5>
              <fieldset>
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
              {this.renderExpertiseList()}
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationForm;
