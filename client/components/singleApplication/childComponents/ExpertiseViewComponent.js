import React, {Component} from 'react';

class ExpertiseViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const expertises = [];
    if (this.props.expertise) {
      this.props.expertise.forEach((expertise, index) => {
        expertises.push(
          <div name={`expertise${index}`} key={`expertise${index}`} className='row mb-2'>
            <div className='col-8 pr-0'>
              <div className='input-group ml-0'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>Expertise</div>
                </div>
                <input
                  disabled
                  type='text'
                  name={`name${index}`}
                  key={`name${index}`}
                  value={expertise.name || ''}
                  className='form-control'
                />
              </div>
            </div>
            <div className='col-4 pl-0'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>Years</div>
                </div>
                <input
                  disabled
                  type='text'
                  name={`lastName${index}`}
                  key={`lastName${index}`}
                  value={expertise.yearsExp || ''}
                  className='form-control'
                />
              </div>
            </div>
          </div>
        );
      });
    }
    return <div id='expertises'>{expertises}</div>;
  }
}

export default ExpertiseViewComponent;
