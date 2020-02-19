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
              <div className={'col-2-sm'} style={{marginRight: '4rem'}}><p>Received</p></div>
              <div className={'col-3'}><p>Name</p></div>
              <div className={'col'}><p>Age</p></div>
              <div className={'col'}><p>Skills</p></div>
              <div className={'col'}><p>Days</p></div>
              <div className={'col'}><p>Start</p></div>
              <div className={'col'}><p>Decision</p></div>
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
