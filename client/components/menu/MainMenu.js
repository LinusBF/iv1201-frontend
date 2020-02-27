import React, {Component} from 'react';
import Logo from './Logo';
import './MainMenu.css';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id={'mainMenu'} className={'container'}>
        <div className="d-flex mt-4">
          <div className={'w-100'}>
            <Logo />
          </div>
          <div className={'flex-shrink-0 mt-3'}>
            <div>
              <a href="#">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;
