import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputField from '../login/inputField/InputField';

// eslint-disable-next-line no-unused-vars
function mapStateToProps(state) {
  return {};
}

class Layout extends Component {
  render() {
    return (
      <div>
        <InputField />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Layout);
