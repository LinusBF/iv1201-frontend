import React, {Component} from 'react';
import clown from '../../Images/flat.svg';
import './Logo.css';

class Logo extends Component {
  render() {
    return (
      <div className={'logo'}>
        <div className={'clownIcon'}>
          <img src={clown} alt={'...'} />
        </div>
        <div className={'logoright'}>
          <div className={'logoHeader1'}>HireTheseClowns</div>
          <div className={'logoHeader2'}>Recruitment Service</div>
        </div>
      </div>
    );
  }
}

export default Logo;
