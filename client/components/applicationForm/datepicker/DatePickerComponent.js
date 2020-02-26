import React, {Component} from 'react';
import DatePickerRow from './DatePickerRow';
import Button from 'react-bootstrap/Button';

class DatePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datePickRows: [{fromDate: null, toDate: null}],
    };
    this.renderAllRows = this.renderAllRows.bind(this);
    this.addRow = this.addRow.bind(this);
  }
  renderAllRows() {
    const arr = [];
    this.state.datePickRows.forEach((val, index) => {
      let row = this.state.datePickRows[index];
      arr.push(<DatePickerRow fromDate={row.fromDate} toDate={row.toDate} key={`row-${index}`} />);
    });
    return arr;
  }
  addRow() {
    const newState = this.state.datePickRows.push({from: null, to: null});
    this.setState({newState});
    this.forceUpdate();
  }
  render() {
    const allRows = [];
    allRows.push(this.renderAllRows());
    return (
      <div>
        {allRows}
        <Button onClick={this.addRow} className={'mt-2 mb-4'} variant="primary" size="md" block>
          Add row
        </Button>
      </div>
    );
  }
}

export default DatePickerComponent;
