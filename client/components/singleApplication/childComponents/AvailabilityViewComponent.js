import React, {Component} from 'react';

class AvailabilityViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const availability = [];
    this.props.data.forEach((available, index) => {
      availability.push(
        <div name={`availability${index}`} key={`availability${index}`} className="row mb-2">
          <div className="col pr-0">
            <div className="input-group ml-0">
              <div className="input-group-prepend">
                <div className="input-group-text">From</div>
              </div>
              <input
                disabled
                type="text"
                name={`from${index}`}
                key={`from${index}`}
                value={available.from}
                className="form-control"
              />
            </div>
          </div>
          <div className="col pl-2">
            <div className="input-group ml-0">
              <div className="input-group-prepend">
                <div className="input-group-text">To</div>
              </div>
              <input
                disabled
                type="text"
                name={`to${index}`}
                key={`to${index}`}
                value={available.to}
                className="form-control"
              />
            </div>
          </div>
        </div>
      );
    });
    return <div id="availability">{availability}</div>;
  }
}

export default AvailabilityViewComponent;
