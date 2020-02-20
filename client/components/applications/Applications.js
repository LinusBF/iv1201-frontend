/*eslint-disable*/
import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from 'react-bootstrap';
import './Applications.css';
import clown from '../../Images/flat.svg';
import data from './fakeApplicationData'

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedSoFar: 20,
      //items: Array.from({length: 20}),
      items: data.apps.slice(0,20)
    };
    this.sort = this.sort.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(data.apps.slice(0,this.state.loadedSoFar+20))
      });
    }, 1500);
  }

  sort(col){
    console.log(this.state.items);
    const a = new Date(this.state.items[0].applyDate);
    const b = new Date(this.state.items[1].applyDate);
    const updatedArray = this.state.items.sort((a,b) => {
      return a>b ? -1 : a<b ? 1 : 0
    });
    this.setState({items: updatedArray});
    this.forceUpdate();
  }

  calcAge(ssn){
    return 25;
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

        <ListGroup id={'listGroup'} className={'container justify-content-md-center'} >
          <ListGroupItem className={'list-group-item list-group-item-action active flex-column align-items-start'} id={'listGroup-header'}>
            <div className='d-flex w-100 justify-content-between' >
              <div className={'colHead col-2-sm'} style={{marginRight: '4rem'}}><a href={'#'} onClick={() => {this.sort(1)}}>Received</a></div>
              <div className={'colHead col-3'}><a href="#" onClick={() => {this.sort(2)}}>Name</a></div>
              <div className={'colHead col'}><a href={"#"} onClick={() => {this.sort(3)}}>Age</a></div>
              <div className={'colHead col'}><a href={"#"} onClick={() => {this.sort(4)}}>Skills</a></div>
              <div className={'colHead col'}><a href={"#"} onClick={() => {this.sort(5)}}>Days</a></div>
              <div className={'colHead col'}><a href={"#"} onClick={() => {this.sort(6)}}>Start</a></div>
              <div className={'colHead col'}><a href={"#"} onClick={() => {this.sort(7)}}>Decision</a></div>
            </div>
          </ListGroupItem>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {this.state.items.map((i, index) => (
              <ListGroupItem className={'list-group-item list-group-item-action flex-column align-items-start'} key={index}>
                <div className='d-flex w-100'>
                  <p className={'col-2-sm'} style={{marginRight: '3rem'}}>{this.state.items[index].applyDate}</p>
                  <p className={'col-3'}>{this.state.items[index].firstName} {this.state.items[index].lastName}</p>
                  <p className={'col'}>{this.calcAge(this.state.items[index].ssn)}</p>
                  <p className={'col'}>{this.state.items[index].expertise.length}</p>
                  <p className={'col'}>{this.state.items[index].available.length}</p>
                  <p className={'col-2-sm'} style={{marginRight: '4rem'}}>{this.state.items[index].available[0]}</p>
                  <div className='alert alert-warning col text-center' role='alert'>{this.state.items[index].approved.toString()}</div>
                </div>
              </ListGroupItem>
            ))}
          </InfiniteScroll>
        </ListGroup>
      </div>
    );
  }
}

export default Applications;
