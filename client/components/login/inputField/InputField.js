import FloatingLabel from 'react-styled-floating-label';
import styled from 'styled-components';

import React, {Component} from 'react';

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;

  border: 1px solid grey;
  height: 15px;

  font-size: 1.25em;
  padding-left: 2em;
  padding-top: 1em;
  padding-bottom: 1em;
  min-width: 20em;

  :focus {
    border-color: #5eaefe;
    outline: none;
    padding-left: 2em;
    padding-top: 1em;
    padding-bottom: 1em;
  }
`;

class InputField extends Component {
  render() {
    return (
      <div>
        <FloatingLabel text={'Enter your email'}>
          <Input type={'email'} />
        </FloatingLabel>
      </div>
    );
  }
}

export default InputField;
