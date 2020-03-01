import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListGroup from 'react-bootstrap/ListGroup';
import {ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
import './Applications.css';
import sortApplications from './applicationSort';
import MainMenu from '../menu/MainMenu';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';

const COUNT_TO_LOAD = 2;

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingOn: 'firstName',
      redirect: false,
      items: [],
    };
    this.sortByProperty = this.sortByProperty.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  componentDidMount() {
    this.fetchMoreData();
    setTimeout(this.fetchMoreData, 5000);
  }

  sortByProperty(propPath) {
    sortApplications(propPath, this.state.items).then(updatedArray => {
      this.setState({
        sortingOn: propPath,
        items: updatedArray,
        loadedSoFar: this.state.loadedSoFar,
      });
    });
  }

  fetchMoreData() {
    if (typeof this.props.idToken === 'undefined') return;
    axios
      .post('/user-status', {token: this.props.idToken})
      .then(res => {
        if (res.data === 'admin') {
          return axios.post('/fetch-applications', {
            offset: this.state.items.length,
            count: 10,
            token: this.props.idToken,
          });
        } else {
          this.setState({
            ...this.state,
            redirect: true,
          });
          return {data: {applications: []}};
        }
      })
      .then(res => {
        const newItemList = this.state.items;
        newItemList.push(...res.data.applications);
        sortApplications(this.state.sortingOn, newItemList).then(updatedArray => {
          this.setState({
            ...this.state,
            items: updatedArray,
          });
        });
      });
  }

  calcAge(ssn) {
    return 25;
  }

  render() {
    /* eslint-disable */
    return (
      <div className={'container-fluid'}>
        <MainMenu />
        <ListGroup id={'listGroup'} className={'container justify-content-md-center'} >
          <ListGroupItem className={'list-group-item list-group-item-action active flex-column align-items-start'} id={'listGroup-header'}>
            <div className='d-flex w-100 justify-content-between' >
              <div className={'colHead col-2-sm'} style={{marginRight: '4rem'}}><a href={'#'} id={'head1'} onClick={() => {this.sortByProperty('applyDate')}}>Received</a></div>
              <div className={'colHead col-3'}><a href="#" id={'head2'} onClick={() => {this.sortByProperty('firstName')}}>Name</a></div>
              <div className={'colHead col'}><a href={"#"} id={'head3'}>Age</a></div>
              <div className={'colHead col'} style={{marginLeft: '-2rem'}}><a href={"#"}>Skills</a></div>
              <div className={'colHead col'} style={{marginLeft: '-2rem'}}><a href={"#"}>Days</a></div>
              <div className={'colHead col'} style={{marginLeft: '-2rem'}}><a href={"#"} onClick={() => {this.sortByProperty('available[0].from')}}>Start</a></div>
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
              <Link to={{pathname: '/SingleApplication/' + i.uId, applicationState: i}} key={index}>
                <ListGroupItem className={'list-group-item list-group-item-action flex-column align-items-start'}>
                  <div className='d-flex w-100'>
                    <p className={'col-2-sm'} style={{marginRight: '3rem'}}>{i.applyDate}</p>
                    <p className={'col-3'}>{i.firstName} {i.lastName}</p>
                    <p className={'col'}>{this.calcAge(i.ssn)}</p>
                    <p className={'col'}>{i.expertise.length}</p>
                    <p className={'col'}>{i.available.length}</p>
                    <p className={'col-2-sm'} style={{marginRight: '4rem'}}>{i.available[0].from}</p>
                    <div className='alert alert-warning col text-center' role='alert'>{i.approved}</div>
                  </div>
                </ListGroupItem>
              </Link>
            ))}
          </InfiniteScroll>
        </ListGroup>
        {typeof this.props.idToken === 'undefined' || this.state.redirect ? (
          <Redirect to='/'/>
        ) : (
          <div/>
        )}
      </div>
    );
    /* eslint-enable */
  }
}
function mapStateToProps(state) {
  return {idToken: state.login.idToken};
}
export default connect(mapStateToProps, {login})(Applications);
