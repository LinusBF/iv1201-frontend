/*eslint-disable*/
import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from 'react-bootstrap';
import './Applications.css';
import clown from '../../Images/flat.svg';
import data from './fakeApplicationData';
import sortApplications from './applicationSort';
import MainMenu from '../menu/MainMenu';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingOn: 1,
      loadedSoFar: 30,
      items: data.apps.slice(0, 30),
    };
    this.sort = this.sort.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        sortingOn: this.state.sortingOn,
        items: this.state.items.concat(
          data.apps.slice(this.state.loadedSoFar, this.state.loadedSoFar + 30),
        ),
        loadedSoFar: this.state.loadedSoFar + 30,
      });
    }, 1500);
  }

  sort(col) {
    sortApplications(col, this.state.items).then(updatedArray => {
      this.setState({
        sortingOn: this.state.sortingOn,
        items: updatedArray,
        loadedSoFar: this.state.loadedSoFar,
      });
      this.forceUpdate();
    });
  }

  calcAge(ssn) {
    //Todo: should calculate age be done server-side?
    return 25;
  }

  render() {
    return (
      <div className={'container-fluid'}>
        <MainMenu />
        <ListGroup id={'listGroup'} className={'container justify-content-md-center'} >
          <ListGroupItem className={'list-group-item list-group-item-action active flex-column align-items-start'} id={'listGroup-header'}>
            <div className='d-flex w-100 justify-content-between' >
              <div className={'colHead col-2-sm'} style={{marginRight: '4rem'}}><a href={'#'} id={'head1'} onClick={() => {this.sort(1)}}>Received</a></div>
              <div className={'colHead col-3'}><a href="#" id={'head2'} onClick={() => {this.sort(2)}}>Name</a></div>
              <div className={'colHead col'}><a href={"#"} id={'head3'}>Age</a></div>
              <div className={'colHead col'} style={{marginLeft: '-2rem'}}><a href={"#"}>Skills</a></div>
              <div className={'colHead col'} style={{marginLeft: '-2rem'}}><a href={"#"}>Days</a></div>
              <div className={'colHead col'} style={{marginLeft: '-2rem'}}><a href={"#"} onClick={() => {this.sort(6)}}>Start</a></div>
              <div className={'colHead col'}><a href={"#"}>Decision</a></div>
            </div>
          </ListGroupItem>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h5>Loading...</h5>}
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
