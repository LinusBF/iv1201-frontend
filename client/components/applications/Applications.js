/*eslint-disable*/
import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from 'react-bootstrap';
import './Applications.css';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array.from({length: 20}),
    };
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({length: 20})),
      });
    }, 1500);
  }

  render() {
    return (
      <div className={'container-fluid'}>
        <div className='row'>
          <h1>demo: react-infinite-scroll-component</h1>
          <hr />
        </div>

        <ListGroup className={'container justify-content-md-center'} id={'listGroup'}>
          <ListGroupItem className={'list-group-item list-group-item-action active flex-column align-items-start'} id={'listGroup-header'}>
            <div className='d-flex w-100 justify-content-between' >
              <div style={{marginRight: '-0.2rem'}}><p>Received</p></div>
              <div style={{marginRight: '3.2rem'}}><p>Name</p></div>
              <div style={{marginRight: '-2.4rem'}}><p>Age</p></div>
              <div style={{marginRight: '-2.2rem'}}><p>Skills</p></div>
              <div style={{marginRight: '-3rem'}}><p>Days</p></div>
              <div style={{marginRight: '2rem'}}><p>Start</p></div>
              <div style={{marginRight: '1.6rem'}}><p>Decision</p></div>
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
                <div className='d-flex w-100 justify-content-between'>
                  <p>2020-09-32</p>
                  <p>Melker Mossberg</p>
                  <p>19</p>
                  <p>20</p>
                  <p>30</p>
                  <p>2020-09-32</p>
                  <div className='alert alert-warning' role='alert'>No decision</div>
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
