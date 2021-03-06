import React, {Component} from 'react';
import Logo from './Logo';
import './MainMenu.css';
import firebase from '../../firebaseConfig';
import {connect} from 'react-redux';
import {logout, setLoginStatus} from '../../redux/actions';
import {Redirect} from 'react-router-dom';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doLogOut: false,
    };
    this.logout = this.logout.bind(this);
  }
  logout() {
    const that = this;
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          that.props.logout();
          that.setState({doLogOut: true});
        },
        function(error) {
          console.log(error);
        }
      );
  }
  render() {
    return (
      <div id={'mainMenu'} className={'container'}>
        <div className='d-flex mt-4'>
          <div className={'w-100'}>
            <Logo />
          </div>
          {this.props.loggedIn === false ? (
            <div />
          ) : (
            <div className={'flex-shrink-0 mt-3'}>
              <div>
                <a href='#' onClick={this.logout}>
                  Log Out
                </a>
              </div>
            </div>
          )}
        </div>
        {this.state.doLogOut === true ? <Redirect to='/' /> : <div />}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {idToken: state.login.idToken, loggedIn: state.login.loggedIn};
}
export default connect(mapStateToProps, {logout, setLoginStatus})(MainMenu);
