import React, {Component} from 'react';
import './Application.css';
import clown from '../../Images/flat.svg';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

        <div className={'container justify-content-md-center'}></div>
      </div>
    );
  }
}

export default Application;
